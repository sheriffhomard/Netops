import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

type ScreenshotKey = 'noc' | 'exams' | 'terminal' | 'flashcards' | 'landing';

interface ScreenshotData {
  key: ScreenshotKey;
  imageSrc: string;
  category: string;
  aspect: string;
}

const SCREENSHOTS: ScreenshotData[] = [
  {
    key: 'noc',
    imageSrc: '/screenshots/noc-dashboard.jpg',
    category: 'NOC & Supervision',
    aspect: '16:9',
  },
  {
    key: 'exams',
    imageSrc: '/screenshots/exam-simulator.jpg',
    category: 'Certifications & Proctor',
    aspect: '16:9',
  },
  {
    key: 'terminal',
    imageSrc: '/screenshots/cisco-terminal.jpg',
    category: 'Console Cisco IOS-XE',
    aspect: '16:9',
  },
  {
    key: 'flashcards',
    imageSrc: '/screenshots/flashcards-srs.jpg',
    category: 'SRS Leitner 5 Boîtes',
    aspect: '16:9',
  },
  {
    key: 'landing',
    imageSrc: '/screenshots/landing-page.jpg',
    category: 'Vitrine Publique',
    aspect: '16:9',
  },
];

export const ScreenshotsGallery: React.FC = () => {
  const { t } = useTranslation(['landing']);
  const [activeKey, setActiveKey] = useState<ScreenshotKey>('noc');
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);

  const currentItem = SCREENSHOTS.find((s) => s.key === activeKey) || SCREENSHOTS[0];

  return (
    <div className="w-full">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {SCREENSHOTS.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveKey(item.key)}
              className={`px-4 py-2 text-xs font-mono rounded-xl transition-all border cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-[#121620] text-[#00e5ff] border-[#00e5ff]/60 shadow-[0_0_15px_rgba(0,229,255,0.15)] font-semibold'
                  : 'bg-[#0a0e16]/60 text-[#849396] hover:text-[#dfe2ee] border-[#334155]/50 hover:border-[#334155]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? 'bg-[#00e5ff] animate-pulse' : 'bg-[#4a5568]'
                }`}
              />
              <span>{t(`landing:gallery.tabs.${item.key}`)}</span>
            </button>
          );
        })}
      </div>

      {/* Main Active Screenshot Showcase Card */}
      <div className="rounded-2xl bg-[#0a0e16] border border-[#334155]/60 overflow-hidden shadow-2xl transition-all">
        {/* Card Header Bar */}
        <div className="px-5 py-3.5 bg-[#121620]/90 border-b border-[#334155]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
            <div>
              <span className="text-[11px] font-mono text-[#00e5ff] uppercase tracking-wider block">
                {t(`landing:gallery.items.${activeKey}.badge`)}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#dfe2ee]">
                {t(`landing:gallery.items.${activeKey}.title`)}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#849396] hidden sm:inline">
              Interface Réelle v2.6.0
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreenModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181c24] hover:bg-[#202530] text-[#00e5ff] text-xs font-mono border border-[#334155]/60 transition-colors cursor-pointer"
              title={t('landing:gallery.viewFullscreen')}
            >
              <span className="material-symbols-outlined text-sm">fullscreen</span>
              <span className="hidden sm:inline">{t('landing:gallery.viewFullscreen')}</span>
            </button>
          </div>
        </div>

        {/* Screenshot Image Preview Container */}
        <div
          onClick={() => setIsFullscreenModalOpen(true)}
          className="relative group cursor-zoom-in bg-[#070a10] overflow-hidden"
        >
          <img
            src={currentItem.imageSrc}
            alt={t(`landing:gallery.items.${activeKey}.title`)}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[580px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
          />

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
            <div className="text-xs font-mono text-[#dfe2ee] bg-[#121620]/90 px-3 py-1.5 rounded-lg border border-[#334155]/60 backdrop-blur-md">
              <span className="text-[#00e5ff]">🔍</span> {t('landing:gallery.viewFullscreen')}
            </div>
            <div className="text-xs font-mono text-[#849396] bg-[#121620]/90 px-3 py-1.5 rounded-lg border border-[#334155]/60 backdrop-blur-md">
              Resolution Ultra-HD · Sans cadre
            </div>
          </div>
        </div>

        {/* Caption & Technical Details */}
        <div className="p-5 sm:p-6 bg-[#0a0e16] border-t border-[#334155]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#bac9cc] leading-relaxed max-w-4xl">
            {t(`landing:gallery.items.${activeKey}.description`)}
          </p>

          <div className="shrink-0 text-xs font-mono text-[#849396] flex items-center gap-2">
            <span className="text-[#10b981]">● Production Ready</span>
            <span>·</span>
            <span>Zero Slop</span>
          </div>
        </div>
      </div>

      {/* Thumbnail Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
        {SCREENSHOTS.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveKey(item.key)}
              className={`p-1.5 rounded-xl border text-left transition-all cursor-pointer group bg-[#0a0e16] ${
                isActive
                  ? 'border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                  : 'border-[#334155]/50 hover:border-[#849396]/60'
              }`}
            >
              <div className="overflow-hidden rounded-lg aspect-video mb-1.5 bg-[#121620]">
                <img
                  src={item.imageSrc}
                  alt={t(`landing:gallery.items.${item.key}.title`)}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-top transition-all duration-300 ${
                    isActive ? 'scale-105' : 'group-hover:scale-105 opacity-75 group-hover:opacity-100'
                  }`}
                />
              </div>
              <div className="px-1">
                <span
                  className={`block text-[11px] font-mono truncate transition-colors ${
                    isActive ? 'text-[#00e5ff] font-semibold' : 'text-[#849396] group-hover:text-[#dfe2ee]'
                  }`}
                >
                  {t(`landing:gallery.tabs.${item.key}`)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Zoom Modal */}
      {isFullscreenModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#070a10]/95 backdrop-blur-xl flex flex-col p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsFullscreenModalOpen(false)}
        >
          {/* Modal Top Bar */}
          <div
            className="flex items-center justify-between pb-3 mb-3 border-b border-[#334155]/60"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[11px] font-mono text-[#00e5ff] uppercase tracking-wider block">
                {t(`landing:gallery.items.${activeKey}.badge`)}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-[#dfe2ee]">
                {t(`landing:gallery.items.${activeKey}.title`)}
              </h4>
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreenModalOpen(false)}
              className="p-2 rounded-xl bg-[#181c24] hover:bg-[#222836] text-[#dfe2ee] hover:text-[#00e5ff] border border-[#334155]/60 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            >
              <span>{t('landing:gallery.closeModal')}</span>
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>

          {/* Modal Main Image */}
          <div
            className="flex-1 flex items-center justify-center overflow-auto p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.imageSrc}
              alt={t(`landing:gallery.items.${activeKey}.title`)}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain rounded-xl border border-[#334155]/60 shadow-2xl"
            />
          </div>

          {/* Modal Bottom Bar Navigation */}
          <div
            className="pt-3 border-t border-[#334155]/40 flex items-center justify-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {SCREENSHOTS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setActiveKey(s.key)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  s.key === activeKey
                    ? 'bg-[#00e5ff] text-[#00363d] font-bold'
                    : 'bg-[#121620] text-[#849396] hover:text-[#dfe2ee] border border-[#334155]/40'
                }`}
              >
                {t(`landing:gallery.tabs.${s.key}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
