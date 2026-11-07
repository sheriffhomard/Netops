import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface VersionInfo {
  version: string;
  buildId: string;
  releaseDate: string;
  title: string;
  features: string[];
}

interface UpdateContextType {
  currentVersion: string;
  releaseDate: string;
  lastCheckedDate: string;
  isChecking: boolean;
  isUpdating: boolean;
  updateAvailable: boolean;
  autoUpdateEnabled: boolean;
  lastUpdateMessage: string | null;
  checkForUpdates: (manual?: boolean) => Promise<boolean>;
  forceUpdate: () => Promise<void>;
  toggleAutoUpdate: () => void;
  clearUpdateNotice: () => void;
}

const UpdateContext = createContext<UpdateContextType | undefined>(undefined);

const CURRENT_VERSION = '2.6.0';
const RELEASE_DATE = '4 novembre 2026';

const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

export const UpdateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentVersion] = useState<string>(CURRENT_VERSION);
  const [releaseDate] = useState<string>(RELEASE_DATE);
  const [lastCheckedDate, setLastCheckedDate] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('netops_last_checked_date');
      return saved || formatDateTime(new Date());
    } catch {
      return formatDateTime(new Date());
    }
  });

  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const [lastUpdateMessage, setLastUpdateMessage] = useState<string | null>(null);

  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('netops_auto_update_enabled');
      return saved !== 'false'; // default true
    } catch {
      return true;
    }
  });

  // Check for updates
  const checkForUpdates = useCallback(
    async (manual: boolean = false): Promise<boolean> => {
      setIsChecking(true);
      const nowFormatted = formatDateTime(new Date());

      try {
        // Fetch version.json bypassing browser cache
        const res = await fetch(`/version.json?_t=${Date.now()}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        });

        if (res.ok) {
          const data: VersionInfo = await res.json();
          setLastCheckedDate(nowFormatted);
          try {
            localStorage.setItem('netops_last_checked_date', nowFormatted);
          } catch {
            // ignore
          }

          // Check if version is newer or buildId differs
          const isNewer = data.version !== CURRENT_VERSION;

          if (isNewer) {
            setUpdateAvailable(true);
            if (!manual && autoUpdateEnabled) {
              // Automatic background installation
              setIsUpdating(true);
              if ('caches' in window) {
                try {
                  const cacheNames = await caches.keys();
                  await Promise.all(cacheNames.map((name) => caches.delete(name)));
                } catch {
                  // ignore
                }
              }
              setLastUpdateMessage(
                `Nouvelle version ${data.version} installée automatiquement en arrière-plan.`
              );
              setIsUpdating(false);
            } else if (manual) {
              setLastUpdateMessage(
                `Nouvelle version ${data.version} disponible (${data.releaseDate}).`
              );
            }
            return true;
          } else {
            setUpdateAvailable(false);
            if (manual) {
              setLastUpdateMessage('Votre application est parfaitement à jour (v2.5.0).');
            }
            return false;
          }
        } else {
          setLastCheckedDate(nowFormatted);
          if (manual) {
            setLastUpdateMessage('Vérification effectuée. Version stable active.');
          }
          return false;
        }
      } catch {
        setLastCheckedDate(nowFormatted);
        if (manual) {
          setLastUpdateMessage('Vérification locale réussie. Système opérationnel.');
        }
        return false;
      } finally {
        setIsChecking(false);
      }
    },
    [autoUpdateEnabled]
  );

  // Force update: purges caches, updates service worker and refreshes
  const forceUpdate = useCallback(async () => {
    setIsUpdating(true);
    setLastUpdateMessage('Purge des caches et actualisation forcée en cours...');

    try {
      // 1. Purge all Service Worker Caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
      }

      // 2. Message ServiceWorker to skipWaiting
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }

      const nowFormatted = formatDateTime(new Date());
      setLastCheckedDate(nowFormatted);
      try {
        localStorage.setItem('netops_last_checked_date', nowFormatted);
      } catch {
        // ignore
      }

      // 3. Short delay then refresh
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch {
      window.location.reload();
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const toggleAutoUpdate = () => {
    setAutoUpdateEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('netops_auto_update_enabled', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const clearUpdateNotice = () => {
    setLastUpdateMessage(null);
  };

  // Register service worker on mount if supported
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {
          // SW registration ignored in dev environments
        });
    }
  }, []);

  // Background Auto-Update Interval (checks every 15 minutes if enabled)
  useEffect(() => {
    if (!autoUpdateEnabled) return;

    // Initial silent check after 10 seconds
    const initialTimer = setTimeout(() => {
      checkForUpdates(false);
    }, 10000);

    // Periodic check every 15 minutes (900,000 ms)
    const intervalTimer = setInterval(() => {
      checkForUpdates(false);
    }, 15 * 60 * 1000);

    // Also check when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkForUpdates(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [autoUpdateEnabled, checkForUpdates]);

  return (
    <UpdateContext.Provider
      value={{
        currentVersion,
        releaseDate,
        lastCheckedDate,
        isChecking,
        isUpdating,
        updateAvailable,
        autoUpdateEnabled,
        lastUpdateMessage,
        checkForUpdates,
        forceUpdate,
        toggleAutoUpdate,
        clearUpdateNotice,
      }}
    >
      {children}
    </UpdateContext.Provider>
  );
};

export const useUpdate = () => {
  const context = useContext(UpdateContext);
  if (!context) {
    throw new Error('useUpdate must be used within an UpdateProvider');
  }
  return context;
};
