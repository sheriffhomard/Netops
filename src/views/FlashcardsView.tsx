import React, { useState, useEffect, useMemo, useRef } from 'react';
import { initialFlashcards, Flashcard } from '../data/workshopsData';
import { ViewMode } from '../types';
import { cloudGlossaryTerms } from '../data/cloudData';
import { useAuth } from '../context/AuthContext';


interface FlashcardsViewProps {
  onNavigate?: (view: ViewMode) => void;
  initialSearchQuery?: string;
  initialModule?: string;
  onOpenCloudTerm?: (termId: string) => void;
  onOpenCloudArticle?: (articleId: string) => void;
}

type DisplayMode = 'focus' | 'grid' | 'blitz' | 'create';
type VendorFilter = 'all' | 'cisco' | 'paloalto' | 'fortinet' | 'comptia' | 'juniper';

const LOCAL_STORAGE_KEY_CUSTOM_CARDS = 'netops_custom_flashcards_v1';
const LOCAL_STORAGE_KEY_MASTERED = 'netops_flashcards_mastered_ids';
const LOCAL_STORAGE_KEY_REVIEW = 'netops_flashcards_review_ids';
const LOCAL_STORAGE_KEY_FAVORITES = 'netops_flashcards_favorite_ids';

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  onNavigate,
  initialSearchQuery = '',
  initialModule = 'all',
  onOpenCloudTerm,
  onOpenCloudArticle,
}) => {
  const { user, userFlashcards, createUserFlashcard } = useAuth();

  // Load initial cards merged with custom cards from localStorage
  const [cards, setCards] = useState<Flashcard[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_CARDS);
      if (saved) {
        const custom = JSON.parse(saved);
        return [...initialFlashcards, ...custom];
      }
    } catch {
      // fallback
    }
    return initialFlashcards;
  });

  // Sync real-time Firestore flashcards
  useEffect(() => {
    if (userFlashcards && userFlashcards.length > 0) {
      const firestoreCards: Flashcard[] = userFlashcards.map((uf) => ({
        id: uf.id,
        category: uf.certTrack || 'Perso (Firestore)',
        moduleCode: uf.module,
        moduleName: `Module ${uf.module}`,
        difficulty: uf.difficulty === 'Facile' ? 'Fondamental' : uf.difficulty === 'Difficile' ? 'Avancé' : 'Intermédiaire',
        frontTitle: uf.front.length > 50 ? uf.front.substring(0, 47) + '...' : uf.front,
        frontPrompt: uf.front,
        backTitle: 'Réponse / Spécification technique',
        backContent: uf.back,
        hint: uf.tags && uf.tags.length > 0 ? `Tags : ${uf.tags.join(', ')}` : 'Flashcard personnalisée sauvegardée sur Firestore',
      }));

      setCards((prev) => {
        const firestoreIds = new Set(firestoreCards.map((c) => c.id));
        const rest = prev.filter((c) => !firestoreIds.has(c.id));
        return [...firestoreCards, ...rest];
      });
    }
  }, [userFlashcards]);


  // Learning progress states
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_MASTERED);
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // fallback
    }
    return new Set<string>();
  });

  const [reviewIds, setReviewIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_REVIEW);
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // fallback
    }
    return new Set<string>();
  });

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_FAVORITES);
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // fallback
    }
    return new Set<string>();
  });

  // Synchronize to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_MASTERED, JSON.stringify(Array.from(masteredIds)));
    } catch {}
  }, [masteredIds]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_REVIEW, JSON.stringify(Array.from(reviewIds)));
    } catch {}
  }, [reviewIds]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_FAVORITES, JSON.stringify(Array.from(favoriteIds)));
    } catch {}
  }, [favoriteIds]);

  // View mode & filters
  const [displayMode, setDisplayMode] = useState<DisplayMode>('focus');
  const [vendorFilter, setVendorFilter] = useState<VendorFilter>('all');
  const [selectedModule, setSelectedModule] = useState<string>(initialModule);
  const [statusFilter, setStatusFilter] = useState<'all' | 'review' | 'mastered' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  // Synchronize external props when navigated from Encyclopedia or Glossary
  useEffect(() => {
    if (initialSearchQuery !== undefined && initialSearchQuery !== '') {
      setSearchQuery(initialSearchQuery);
      setDisplayMode('focus');
    }
  }, [initialSearchQuery]);

  useEffect(() => {
    if (initialModule !== undefined && initialModule !== 'all') {
      setSelectedModule(initialModule);
    }
  }, [initialModule]);

  // Active study state (Focus mode)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [studiedCount, setStudiedCount] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Blitz mode state
  const [blitzTimeLeft, setBlitzTimeLeft] = useState<number>(120);
  const [blitzActive, setBlitzActive] = useState<boolean>(false);
  const [blitzScore, setBlitzScore] = useState<{ correct: number; review: number }>({ correct: 0, review: 0 });
  const blitzTimerRef = useRef<NodeJS.Timeout | null>(null);

  // New card creation form state
  const [newCard, setNewCard] = useState({
    moduleCode: 'CCNA-D1',
    moduleName: 'Cisco CCNA 200-301 - 1.0 Network Fundamentals',
    category: 'Réseau & Protocoles',
    difficulty: 'Fondamental' as 'Fondamental' | 'Intermédiaire' | 'Avancé',
    frontTitle: '',
    frontPrompt: '',
    backTitle: '',
    backContent: '',
    rfcRef: '',
    cliExample: '',
    hint: '',
  });
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null);

  // Filter cards by vendor, module, status and search
  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      // Vendor filter
      if (vendorFilter === 'cisco') {
        const isCisco =
          c.moduleCode?.startsWith('CCNA') ||
          c.moduleCode?.startsWith('ENCOR') ||
          c.moduleCode?.startsWith('ENARSI') ||
          c.moduleCode?.startsWith('SCOR');
        if (!isCisco) return false;
      } else if (vendorFilter === 'paloalto') {
        if (!c.moduleCode?.startsWith('PCNSE')) return false;
      } else if (vendorFilter === 'fortinet') {
        if (!c.moduleCode?.startsWith('FCP')) return false;
      } else if (vendorFilter === 'comptia') {
        const isComptia = c.moduleCode?.startsWith('SECPLUS') || c.moduleCode?.startsWith('NETPLUS');
        if (!isComptia) return false;
      } else if (vendorFilter === 'juniper') {
        if (!c.moduleCode?.startsWith('JNCIA')) return false;
      }

      // Module filter
      if (selectedModule !== 'all') {
        if (c.moduleCode !== selectedModule) return false;
      }

      // Status filter
      if (statusFilter === 'review' && !reviewIds.has(c.id)) return false;
      if (statusFilter === 'mastered' && !masteredIds.has(c.id)) return false;
      if (statusFilter === 'favorites' && !favoriteIds.has(c.id)) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = c.frontTitle.toLowerCase().includes(q) || c.backTitle.toLowerCase().includes(q);
        const matchPrompt = c.frontPrompt.toLowerCase().includes(q) || c.backContent.toLowerCase().includes(q);
        const matchModule = (c.moduleCode || '').toLowerCase().includes(q) || (c.category || '').toLowerCase().includes(q);
        const matchRfc = (c.rfcRef || '').toLowerCase().includes(q);
        if (!matchTitle && !matchPrompt && !matchModule && !matchRfc) return false;
      }

      return true;
    });
  }, [cards, vendorFilter, selectedModule, statusFilter, searchQuery, reviewIds, masteredIds, favoriteIds]);

  // Cards in currently selected module (independent of search query & status filter)
  const cardsInSelectedModule = useMemo(() => {
    return cards.filter((c) => {
      if (vendorFilter === 'cisco') {
        const isCisco =
          c.moduleCode?.startsWith('CCNA') ||
          c.moduleCode?.startsWith('ENCOR') ||
          c.moduleCode?.startsWith('ENARSI') ||
          c.moduleCode?.startsWith('SCOR');
        if (!isCisco) return false;
      } else if (vendorFilter === 'paloalto') {
        if (!c.moduleCode?.startsWith('PCNSE')) return false;
      } else if (vendorFilter === 'fortinet') {
        if (!c.moduleCode?.startsWith('FCP')) return false;
      } else if (vendorFilter === 'comptia') {
        const isComptia = c.moduleCode?.startsWith('SECPLUS') || c.moduleCode?.startsWith('NETPLUS');
        if (!isComptia) return false;
      } else if (vendorFilter === 'juniper') {
        if (!c.moduleCode?.startsWith('JNCIA')) return false;
      }

      if (selectedModule !== 'all' && c.moduleCode !== selectedModule) {
        return false;
      }
      return true;
    });
  }, [cards, vendorFilter, selectedModule]);

  // Intelligent module switcher: clears search query if it has 0 results in the newly selected module
  const handleModuleChange = (newMod: string) => {
    setSelectedModule(newMod);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const hasMatch = cards.some(
        (c) =>
          (newMod === 'all' || c.moduleCode === newMod) &&
          (c.frontTitle.toLowerCase().includes(q) ||
            c.backTitle.toLowerCase().includes(q) ||
            c.frontPrompt.toLowerCase().includes(q) ||
            c.backContent.toLowerCase().includes(q) ||
            (c.moduleCode || '').toLowerCase().includes(q) ||
            (c.category || '').toLowerCase().includes(q) ||
            (c.rfcRef || '').toLowerCase().includes(q))
      );
      if (!hasMatch) {
        setSearchQuery('');
      }
    }
  };

  // Clamp current index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  }, [vendorFilter, selectedModule, statusFilter, searchQuery]);

  const activeCard: Flashcard | undefined = filteredCards[currentIndex] || filteredCards[0];

  // Dynamically detect matching cloud glossary concepts for the active card
  const matchedCloudTerms = useMemo(() => {
    if (!activeCard) return [];
    const textToScan = `${activeCard.frontTitle} ${activeCard.frontPrompt} ${activeCard.backTitle} ${activeCard.backContent} ${activeCard.category} ${activeCard.rfcRef || ''}`.toLowerCase();

    return cloudGlossaryTerms.filter((gt) => {
      // If acronym matches as a whole word
      if (gt.acronym && gt.acronym.length >= 3) {
        const regex = new RegExp(`\\b${gt.acronym.toLowerCase()}\\b`, 'i');
        if (regex.test(textToScan)) return true;
      }
      // If primary term keyword matches
      const mainWord = gt.term.split('(')[0].split('—')[0].trim().toLowerCase();
      if (mainWord.length >= 4 && textToScan.includes(mainWord)) return true;
      // If any tag matches
      return gt.tags.some((tag) => tag.length >= 4 && textToScan.includes(tag.toLowerCase()));
    }).slice(0, 3);
  }, [activeCard]);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input/textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (displayMode === 'focus') {
        if (e.code === 'Space') {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        } else if (e.key.toLowerCase() === 'h') {
          e.preventDefault();
          setShowHint((prev) => !prev);
        } else if (e.key === '1') {
          e.preventDefault();
          handleRate('review');
        } else if (e.key === '2') {
          e.preventDefault();
          handleRate('good');
        } else if (e.key === '3') {
          e.preventDefault();
          handleRate('mastered');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayMode, filteredCards.length, currentIndex, activeCard]);

  // Blitz mode timer
  useEffect(() => {
    if (displayMode === 'blitz' && blitzActive && blitzTimeLeft > 0) {
      blitzTimerRef.current = setTimeout(() => {
        setBlitzTimeLeft((t) => t - 1);
      }, 1000);
    } else if (blitzTimeLeft === 0 && blitzActive) {
      setBlitzActive(false);
    }
    return () => {
      if (blitzTimerRef.current) clearTimeout(blitzTimerRef.current);
    };
  }, [displayMode, blitzActive, blitzTimeLeft]);

  // Text-to-speech audio reader
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('La synthèse vocale n\'est pas disponible dans ce navigateur.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!activeCard) return;

    const textToRead = isFlipped
      ? `${activeCard.backTitle}. ${activeCard.backContent.replace(/[•#\-*]/g, '')}`
      : `${activeCard.frontTitle}. ${activeCard.frontPrompt}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Next / Previous navigation
  const handleNext = () => {
    if (filteredCards.length === 0) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    setIsFlipped(false);
    setShowHint(false);
  };

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setIsFlipped(false);
    setShowHint(false);
  };

  const handleShuffle = () => {
    if (filteredCards.length <= 1) return;
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
    showToast('Cartes mélangées aléatoirement');
  };

  const handleToggleFavorite = (cardId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  };

  // Rate card difficulty / spaced repetition Leitner box
  const handleRate = (level: 'review' | 'good' | 'mastered') => {
    if (!activeCard) return;
    setStudiedCount((c) => c + 1);

    if (displayMode === 'blitz') {
      if (level === 'mastered' || level === 'good') {
        setBlitzScore((s) => ({ ...s, correct: s.correct + 1 }));
      } else {
        setBlitzScore((s) => ({ ...s, review: s.review + 1 }));
      }
    }

    if (level === 'mastered') {
      setMasteredIds((prev) => new Set(prev).add(activeCard.id));
      setReviewIds((prev) => {
        const next = new Set(prev);
        next.delete(activeCard.id);
        return next;
      });
    } else if (level === 'review') {
      setReviewIds((prev) => new Set(prev).add(activeCard.id));
      setMasteredIds((prev) => {
        const next = new Set(prev);
        next.delete(activeCard.id);
        return next;
      });
    } else {
      // 'good' -> remove from immediate review
      setReviewIds((prev) => {
        const next = new Set(prev);
        next.delete(activeCard.id);
        return next;
      });
    }

    handleNext();
  };

  const showToast = (msg: string) => {
    setShowSuccessToast(msg);
    setTimeout(() => setShowSuccessToast(null), 3000);
  };

  // Handle custom card creation
  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.frontTitle.trim() || !newCard.frontPrompt.trim() || !newCard.backContent.trim()) {
      alert('Veuillez renseigner au minimum un titre, une question et une réponse.');
      return;
    }

    const created: Flashcard = {
      id: `custom-fc-${Date.now()}`,
      category: newCard.category,
      moduleCode: newCard.moduleCode,
      moduleName: newCard.moduleName,
      difficulty: newCard.difficulty,
      frontTitle: newCard.frontTitle,
      frontPrompt: newCard.frontPrompt,
      backTitle: newCard.backTitle || newCard.frontTitle,
      backContent: newCard.backContent,
      rfcRef: newCard.rfcRef || undefined,
      cliExample: newCard.cliExample || undefined,
      hint: newCard.hint || 'Révisez les spécifications officielles de ce module.',
    };

    const updated = [created, ...cards];
    setCards(updated);

    // Save to Firestore if authenticated
    if (user) {
      createUserFlashcard({
        front: newCard.frontPrompt,
        back: newCard.backContent,
        module: newCard.moduleCode,
        certTrack: newCard.category,
        difficulty: newCard.difficulty === 'Fondamental' ? 'Facile' : newCard.difficulty === 'Avancé' ? 'Difficile' : 'Moyen',
        tags: [newCard.moduleCode, newCard.category],
      })
        .then(() => showToast('Flashcard enregistrée en temps réel sur Google Firestore !'))
        .catch((err) => console.error('Error saving flashcard to Firestore:', err));
    }

    // Save custom cards in localStorage as well for offline resilience
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_CARDS);
      const customList = saved ? JSON.parse(saved) : [];
      customList.unshift(created);
      localStorage.setItem(LOCAL_STORAGE_KEY_CUSTOM_CARDS, JSON.stringify(customList));
    } catch {}

    // Reset form

    setNewCard({
      moduleCode: 'CCNA-D1',
      moduleName: 'Cisco CCNA 200-301 - 1.0 Network Fundamentals',
      category: 'Réseau & Protocoles',
      difficulty: 'Fondamental',
      frontTitle: '',
      frontPrompt: '',
      backTitle: '',
      backContent: '',
      rfcRef: '',
      cliExample: '',
      hint: '',
    });

    setDisplayMode('focus');
    setCurrentIndex(0);
    showToast('Nouvelle Flashcard créée et ajoutée à votre collection !');
  };

  // Start Blitz session
  const handleStartBlitz = () => {
    setBlitzTimeLeft(120);
    setBlitzScore({ correct: 0, review: 0 });
    setBlitzActive(true);
    setDisplayMode('blitz');
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Module filter options
  const moduleOptions = [
    { id: 'all', label: 'Tous les modules' },
    { id: 'CCNA-D1', label: 'Cisco CCNA-D1 : Network Fundamentals (100 Cartes)', vendor: 'cisco' },
    { id: 'CCNA-D2', label: 'Cisco CCNA-D2 : Network Access (100 Cartes)', vendor: 'cisco' },
    { id: 'CCNA-D3', label: 'Cisco CCNA-D3 : IP Connectivity (100 Cartes)', vendor: 'cisco' },
    { id: 'CCNA-D4', label: 'Cisco CCNA-D4 : IP Services (100 Cartes)', vendor: 'cisco' },
    { id: 'CCNA-D5', label: 'Cisco CCNA-D5 : Security Fundamentals (100 Cartes)', vendor: 'cisco' },
    { id: 'CCNA-D6', label: 'Cisco CCNA-D6 : Automation & Programmability (100 Cartes)', vendor: 'cisco' },
    { id: 'ENCOR-D1', label: 'Cisco ENCOR-D1 : Architecture & Enterprise Design (100 Cartes)', vendor: 'cisco' },
    { id: 'ENCOR-D2', label: 'Cisco ENCOR-D2 : Virtualization, SD-Access & SD-WAN (100 Cartes)', vendor: 'cisco' },
    { id: 'ENCOR-D3', label: 'Cisco ENCOR-D3 : Infrastructure, Routing & Wireless (100 Cartes)', vendor: 'cisco' },
    { id: 'ENCOR-D4', label: 'Cisco ENCOR-D4 : Network Assurance & Diagnostics (100 Cartes)', vendor: 'cisco' },
    { id: 'ENCOR-D5', label: 'Cisco ENCOR-D5 : Security, AAA & Zero Trust (100 Cartes)', vendor: 'cisco' },
    { id: 'ENCOR-D6', label: 'Cisco ENCOR-D6 : Automation, Programmability & NetDevOps (100 Cartes)', vendor: 'cisco' },
    { id: 'ENARSI-D1', label: 'Cisco ENARSI-D1 : Layer 3 Technologies & Advanced Routing (100 Cartes)', vendor: 'cisco' },
    { id: 'ENARSI-D2', label: 'Cisco ENARSI-D2 : VPN Technologies & DMVPN (100 Cartes)', vendor: 'cisco' },
    { id: 'ENARSI-D3', label: 'Cisco ENARSI-D3 : Infrastructure Security & Hardening (100 Cartes)', vendor: 'cisco' },
    { id: 'ENARSI-D4', label: 'Cisco ENARSI-D4 : Infrastructure Services & Diagnostics (100 Cartes)', vendor: 'cisco' },
    { id: 'SCOR-D1', label: 'Cisco SCOR-D1 : Security Concepts, Threat Defense & Cryptography (100 Cartes)', vendor: 'cisco' },
    { id: 'SCOR-D2', label: 'Cisco SCOR-D2 : Network Security, Firewalls & VPNs (100 Cartes)', vendor: 'cisco' },
    { id: 'SCOR-D3', label: 'Cisco SCOR-D3 : Securing the Cloud & SaaS Solutions (100 Cartes)', vendor: 'cisco' },
    { id: 'SCOR-D4', label: 'Cisco SCOR-D4 : Content Security (ESA, WSA, Umbrella) (100 Cartes)', vendor: 'cisco' },
    { id: 'SCOR-D5', label: 'Cisco SCOR-D5 : Endpoint Protection & Detection (Secure Endpoint, AnyConnect) (100 Cartes)', vendor: 'cisco' },
    { id: 'SCOR-D6', label: 'Cisco SCOR-D6 : Secure Network Access, Visibility & ISE (100 Cartes)', vendor: 'cisco' },
    { id: 'PCNSE-D1', label: 'Palo Alto PCNSE-D1 : Planning & Core Architecture (100 Cartes)', vendor: 'paloalto' },
    { id: 'PCNSE-D2', label: 'Palo Alto PCNSE-D2 : Deploy & Configure Core Components (100 Cartes)', vendor: 'paloalto' },
    { id: 'PCNSE-D3', label: 'Palo Alto PCNSE-D3 : Deploy & Configure Security & NAT Policies (100 Cartes)', vendor: 'paloalto' },
    { id: 'PCNSE-D4', label: 'Palo Alto PCNSE-D4 : Configure GlobalProtect & User-ID (100 Cartes)', vendor: 'paloalto' },
    { id: 'PCNSE-D5', label: 'Palo Alto PCNSE-D5 : Manage & Troubleshoot (100 Cartes)', vendor: 'paloalto' },
    { id: 'PCNSE-D6', label: 'Palo Alto PCNSE-D6 : Panorama & Centralized Management (100 Cartes)', vendor: 'paloalto' },
    { id: 'FCP-D1', label: 'Fortinet FCP-D1 : System & Network Configuration (25 Cartes)', vendor: 'fortinet' },
    { id: 'FCP-D2', label: 'Fortinet FCP-D2 : Firewall Policies & Security Profiles (25 Cartes)', vendor: 'fortinet' },
    { id: 'FCP-D3', label: 'Fortinet FCP-D3 : Authentication, ZTNA & IPsec VPN (25 Cartes)', vendor: 'fortinet' },
    { id: 'FCP-D4', label: 'Fortinet FCP-D4 : High Availability & Diagnostics (25 Cartes)', vendor: 'fortinet' },
    { id: 'SECPLUS-D4', label: 'CompTIA SECPLUS-D4 : SAML, OAuth, OIDC', vendor: 'comptia' },
    { id: 'NETPLUS-D1', label: 'CompTIA NETPLUS-D1 : Transport & Ports', vendor: 'comptia' },
    { id: 'JNCIA-D1', label: 'Juniper JNCIA-D1 : RE vs PFE Engine', vendor: 'juniper' },
    { id: 'JNCIA-D2', label: 'Juniper JNCIA-D2 : commit confirmed', vendor: 'juniper' },
  ];

  const masteryPercent = cards.length > 0 ? Math.round((masteredIds.size / cards.length) * 100) : 0;

  return (
    <div className="w-full flex flex-col gap-6 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Toast notification */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00363d] border border-[#00e5ff] text-[#00e5ff] px-4 py-2.5 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center gap-2 font-mono text-xs animate-bounce">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{showSuccessToast}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#334155]/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#00363d] text-[#00e5ff] border border-[#00e5ff]/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
              Écran Dédié Flashcards
            </span>
            <span className="text-xs font-mono text-[#a8ffd2] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
              Moteur SRS Répétition Espacée Leitner
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#dfe2ee] tracking-tight">
            Flashcards &amp; Mémos Certifications
          </h1>
          <p className="text-xs sm:text-sm text-[#bac9cc]">
            Mémorisation réflexe des standards RFC, protocoles, commandes CLI et pièges d'examen pour Cisco, Palo Alto, CompTIA &amp; Juniper.
          </p>
        </div>

        {/* Action buttons & mode switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate?.('glossaire-cloud')}
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 bg-[#00363d]/70 hover:bg-[#00363d] text-[#00e5ff] border border-[#00e5ff]/40 shadow-[0_0_12px_rgba(0,229,255,0.2)]"
            title="Consulter l'Encyclopédie et Glossaire Cloud"
          >
            <span className="material-symbols-outlined text-base">cloud_sync</span>
            <span>Encyclopédie Cloud</span>
          </button>

          <button
            onClick={() => setDisplayMode('focus')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              displayMode === 'focus'
                ? 'bg-[#00e5ff] text-[#00363d] shadow-[0_0_14px_rgba(0,229,255,0.4)]'
                : 'bg-[#181c24] text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee] border border-[#334155]/40'
            }`}
          >
            <span className="material-symbols-outlined text-base">flip</span>
            <span>Mode Focus 3D</span>
          </button>

          <button
            onClick={() => setDisplayMode('grid')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              displayMode === 'grid'
                ? 'bg-[#00e5ff] text-[#00363d] shadow-[0_0_14px_rgba(0,229,255,0.4)]'
                : 'bg-[#181c24] text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee] border border-[#334155]/40'
            }`}
          >
            <span className="material-symbols-outlined text-base">grid_view</span>
            <span>Répertoire ({cards.length})</span>
          </button>

          <button
            onClick={handleStartBlitz}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              displayMode === 'blitz'
                ? 'bg-[#ffb4ab] text-[#690005] shadow-[0_0_14px_rgba(255,180,171,0.4)]'
                : 'bg-[#181c24] text-[#ffb4ab] hover:bg-[#262a33] border border-[#ffb4ab]/30'
            }`}
          >
            <span className="material-symbols-outlined text-base">bolt</span>
            <span>Chrono-Blitz 2 min</span>
          </button>

          <button
            onClick={() => setDisplayMode('create')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              displayMode === 'create'
                ? 'bg-[#4edea3] text-[#003822] shadow-[0_0_14px_rgba(78,222,163,0.4)]'
                : 'bg-[#181c24] text-[#4edea3] hover:bg-[#262a33] border border-[#4edea3]/30'
            }`}
          >
            <span className="material-symbols-outlined text-base">add_card</span>
            <span>Créer Carte</span>
          </button>
        </div>
      </div>

      {/* STATS TILES BANNER */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-3.5 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center justify-between text-[#849396] text-[11px] uppercase">
            <span>Cartes Totales</span>
            <span className="material-symbols-outlined text-sm text-[#00e5ff]">style</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#dfe2ee]">{cards.length}</span>
            <span className="text-[10px] text-[#00e5ff]">Fiches mémos</span>
          </div>
        </div>

        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-3.5 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center justify-between text-[#849396] text-[11px] uppercase">
            <span>Taux de Maîtrise</span>
            <span className="material-symbols-outlined text-sm text-[#4edea3]">verified</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#4edea3]">{masteryPercent}%</span>
            <span className="text-[10px] text-[#bac9cc]">({masteredIds.size} validées)</span>
          </div>
        </div>

        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-3.5 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center justify-between text-[#849396] text-[11px] uppercase">
            <span>File "À revoir"</span>
            <span className="material-symbols-outlined text-sm text-[#ffb4ab]">sync_problem</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#ffb4ab]">{reviewIds.size}</span>
            <span className="text-[10px] text-[#bac9cc]">Intervalles courts</span>
          </div>
        </div>

        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-3.5 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center justify-between text-[#849396] text-[11px] uppercase">
            <span>Étudiées Aujourd'hui</span>
            <span className="material-symbols-outlined text-sm text-[#ffcc00]">local_fire_department</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#ffcc00]">{studiedCount}</span>
            <span className="text-[10px] text-[#bac9cc]">Répétitions</span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS BAR (Vendor pills, Module dropdown, Status tabs & Search) */}
      <div className="bg-[#181c24] border border-[#334155]/40 rounded-2xl p-4 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Vendor Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-mono text-[#849396] uppercase shrink-0">Écosystème :</span>
            {(
              [
                { id: 'all', label: 'Tous' },
                { id: 'cisco', label: 'Cisco (CCNA/CCNP)' },
                { id: 'paloalto', label: 'Palo Alto (PCNSE)' },
                { id: 'fortinet', label: 'Fortinet (FCP FortiGate)' },
                { id: 'comptia', label: 'CompTIA (Sec+/Net+)' },
                { id: 'juniper', label: 'Juniper (JNCIA)' },
              ] as { id: VendorFilter; label: string }[]
            ).map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setVendorFilter(v.id);
                  setSelectedModule('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  vendorFilter === v.id
                    ? 'bg-[#00e5ff] text-[#00363d] font-bold shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                    : 'bg-[#0f131c] text-[#bac9cc] hover:bg-[#262a33] border border-[#334155]/30'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#849396] text-base">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une notion, RFC..."
              className="w-full bg-[#0f131c] border border-[#334155]/40 rounded-lg pl-9 pr-8 py-1.5 text-xs text-[#dfe2ee] placeholder-[#849396] focus:outline-none focus:border-[#00e5ff]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#849396] hover:text-[#dfe2ee]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary line: Module Select + Status Filter pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#334155]/30">
          {/* Module dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#849396] uppercase shrink-0">Module :</span>
            <select
              value={selectedModule}
              onChange={(e) => handleModuleChange(e.target.value)}
              className="bg-[#0f131c] border border-[#334155]/40 text-xs font-mono text-[#dfe2ee] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00e5ff] max-w-xs"
            >
              {moduleOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                statusFilter === 'all'
                  ? 'bg-[#262a33] text-[#00e5ff] font-semibold border border-[#00e5ff]/40'
                  : 'text-[#849396] hover:text-[#dfe2ee]'
              }`}
            >
              Toutes ({filteredCards.length})
            </button>
            <button
              onClick={() => setStatusFilter('review')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1 ${
                statusFilter === 'review'
                  ? 'bg-[#ffb4ab]/20 text-[#ffb4ab] font-semibold border border-[#ffb4ab]/40'
                  : 'text-[#849396] hover:text-[#ffb4ab]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" />
              À revoir ({reviewIds.size})
            </button>
            <button
              onClick={() => setStatusFilter('mastered')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1 ${
                statusFilter === 'mastered'
                  ? 'bg-[#4edea3]/20 text-[#4edea3] font-semibold border border-[#4edea3]/40'
                  : 'text-[#849396] hover:text-[#4edea3]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
              Maîtrisées ({masteredIds.size})
            </button>
            <button
              onClick={() => setStatusFilter('favorites')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1 ${
                statusFilter === 'favorites'
                  ? 'bg-[#ffcc00]/20 text-[#ffcc00] font-semibold border border-[#ffcc00]/40'
                  : 'text-[#849396] hover:text-[#ffcc00]'
              }`}
            >
              <span className="material-symbols-outlined text-xs text-[#ffcc00]">star</span>
              Favoris ({favoriteIds.size})
            </button>
          </div>
        </div>

        {/* Active search banner if searchQuery is present */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[#00363d]/50 border border-[#00e5ff]/40 rounded-xl text-xs font-mono">
            <div className="flex items-center gap-2 text-[#00e5ff] overflow-hidden">
              <span className="material-symbols-outlined text-sm shrink-0">filter_alt</span>
              <span className="truncate">
                Recherche active : <strong className="text-white">"{searchQuery}"</strong>
                {selectedModule !== 'all' && (
                  <span className="text-[#849396] ml-1">
                    (dans {moduleOptions.find((m) => m.id === selectedModule)?.label.split(':')[0] || selectedModule})
                  </span>
                )}
              </span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="shrink-0 px-2.5 py-1 bg-[#00e5ff] text-[#00363d] font-bold rounded-lg hover:brightness-110 flex items-center gap-1 text-[11px]"
              title="Effacer la recherche textuelle"
            >
              <span className="material-symbols-outlined text-xs">close</span>
              <span>Effacer la recherche</span>
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          MODE 1: FOCUS 3D CARD
          ========================================================================= */}
      {displayMode === 'focus' && (
        <div className="flex flex-col gap-5">
          {filteredCards.length === 0 ? (
            <div className="bg-[#181c24] border border-[#334155]/40 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-4">
              <span className="material-symbols-outlined text-5xl text-[#00e5ff]">
                {searchQuery ? 'search_off' : 'style'}
              </span>
              <h3 className="text-lg font-bold text-[#dfe2ee]">
                {searchQuery
                  ? `Aucun résultat pour "${searchQuery}"`
                  : 'Aucune flashcard ne correspond aux filtres'}
              </h3>
              <p className="text-xs text-[#bac9cc] max-w-md leading-relaxed">
                {searchQuery ? (
                  cardsInSelectedModule.length > 0 ? (
                    <>
                      Le module sélectionné (<strong>{moduleOptions.find((m) => m.id === selectedModule)?.label || selectedModule}</strong>) comprend <strong>{cardsInSelectedModule.length} flashcards</strong>, mais aucune ne contient le terme <em>"{searchQuery}"</em>.
                    </>
                  ) : (
                    <>Aucune flashcard ne contient le terme <em>"{searchQuery}"</em> dans la sélection actuelle.</>
                  )
                ) : (
                  <>Essayez de réinitialiser vos critères de recherche ou sélectionnez un autre module pour explorer les questions disponibles.</>
                )}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 bg-[#00e5ff] text-[#00363d] font-bold rounded-lg hover:brightness-110 flex items-center gap-1.5 shadow-[0_0_14px_rgba(0,229,255,0.4)]"
                  >
                    <span className="material-symbols-outlined text-sm">clear</span>
                    Effacer la recherche {cardsInSelectedModule.length > 0 ? `(Voir les ${cardsInSelectedModule.length} cartes)` : ''}
                  </button>
                )}
                {searchQuery && selectedModule !== 'all' && (
                  <button
                    onClick={() => {
                      setSelectedModule('all');
                      setVendorFilter('all');
                    }}
                    className="px-3.5 py-2 bg-[#262a33] text-[#dfe2ee] font-semibold rounded-lg hover:bg-[#334155] border border-[#334155]"
                  >
                    Rechercher "{searchQuery}" dans tous les modules
                  </button>
                )}
                <button
                  onClick={() => {
                    setVendorFilter('all');
                    setSelectedModule('all');
                    setStatusFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-3.5 py-2 bg-[#181c24] text-[#849396] hover:text-[#dfe2ee] rounded-lg hover:bg-[#262a33] border border-[#334155]/40"
                >
                  Réinitialiser tous les filtres
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Card Meta Header */}
              <div className="flex items-center justify-between font-mono text-xs text-[#bac9cc]">
                <div className="flex items-center gap-2">
                  <span className="text-[#00e5ff] font-bold">
                    CARTE {currentIndex + 1} / {filteredCards.length}
                  </span>
                  {activeCard && (
                    <span className="hidden sm:inline-block text-[#849396]">
                      • {activeCard.moduleName || activeCard.category}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShuffle}
                    title="Mélanger aléatoirement (Touche R)"
                    className="p-1.5 rounded-lg bg-[#181c24] hover:bg-[#262a33] text-[#bac9cc] border border-[#334155]/40 transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">shuffle</span>
                    <span className="hidden sm:inline text-[10px]">Mélanger</span>
                  </button>

                  <button
                    onClick={handleToggleSpeech}
                    title="Lecture vocale audio"
                    className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 ${
                      isSpeaking
                        ? 'bg-[#00363d] text-[#00e5ff] border-[#00e5ff] animate-pulse'
                        : 'bg-[#181c24] hover:bg-[#262a33] text-[#bac9cc] border-[#334155]/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isSpeaking ? 'volume_up' : 'volume_mute'}
                    </span>
                    <span className="hidden sm:inline text-[10px]">Audio</span>
                  </button>

                  {activeCard && (
                    <button
                      onClick={(e) => handleToggleFavorite(activeCard.id, e)}
                      title="Ajouter aux favoris"
                      className={`p-1.5 rounded-lg border transition-colors ${
                        favoriteIds.has(activeCard.id)
                          ? 'bg-[#ffcc00]/20 text-[#ffcc00] border-[#ffcc00]/50'
                          : 'bg-[#181c24] hover:bg-[#262a33] text-[#849396] border-[#334155]/40'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {favoriteIds.has(activeCard.id) ? 'star' : 'star_border'}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#181c24] h-1.5 rounded-full overflow-hidden border border-[#334155]/20">
                <div
                  className="bg-[#00e5ff] h-full transition-all duration-300 shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                  style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
                />
              </div>

              {/* THE 3D FLIP CARD CONTAINER */}
              {activeCard && (
                <div
                  onClick={() => setIsFlipped((prev) => !prev)}
                  className="min-h-[380px] sm:min-h-[420px] bg-gradient-to-br from-[#181c24] via-[#1c2230] to-[#141822] border-2 border-[#334155]/70 hover:border-[#00e5ff]/60 rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 shadow-2xl relative flex flex-col justify-between group select-none"
                >
                  {/* Top Bar of the Card */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#334155]/40">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="material-symbols-outlined text-[#00e5ff] text-xl">
                        {isFlipped ? 'check_circle' : 'help'}
                      </span>
                      {activeCard.moduleCode && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded font-bold bg-[#00363d] text-[#00e5ff] border border-[#00e5ff]/50">
                          {activeCard.moduleCode}
                        </span>
                      )}
                      <span className="text-xs font-mono font-semibold text-[#00daf3] uppercase tracking-wider">
                        {isFlipped ? 'RÉPONSE & EXPLICATION TECHNIQUE' : `QUESTION • ${activeCard.category}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          activeCard.difficulty === 'Fondamental'
                            ? 'bg-[#003822] text-[#4edea3] border border-[#4edea3]/40'
                            : activeCard.difficulty === 'Intermédiaire'
                            ? 'bg-[#3d2800] text-[#ffcc00] border border-[#ffcc00]/40'
                            : 'bg-[#3d0000] text-[#ffb4ab] border border-[#ffb4ab]/40'
                        }`}
                      >
                        {activeCard.difficulty}
                      </span>
                      <span className="text-xs font-mono text-[#849396] group-hover:text-[#00e5ff] transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">sync</span>
                        {isFlipped ? 'Voir Question' : 'Retourner'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content (Front or Back) */}
                  <div className="py-6 flex flex-col justify-center flex-1">
                    {!isFlipped ? (
                      /* FRONT VIEW */
                      <div className="flex flex-col gap-4 animate-fadeIn">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#dfe2ee] leading-snug">
                          {activeCard.frontTitle}
                        </h2>
                        <p className="text-sm sm:text-base text-[#bac9cc] leading-relaxed">
                          {activeCard.frontPrompt}
                        </p>

                        {/* Expandable Hint */}
                        <div className="mt-4 pt-4 border-t border-[#334155]/20">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowHint((prev) => !prev);
                            }}
                            className="text-xs font-mono text-[#ffcc00] hover:underline flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-sm">lightbulb</span>
                            <span>{showHint ? 'Masquer l\'indice' : 'Afficher un indice (Touche H)'}</span>
                          </button>
                          {showHint && (
                            <div className="mt-2 p-3 rounded-lg bg-[#241c00]/60 border border-[#ffcc00]/40 text-xs text-[#ffdf99] font-mono animate-fadeIn">
                              💡 Indice : {activeCard.hint}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* BACK VIEW */
                      <div className="flex flex-col gap-4 animate-fadeIn">
                        <h3 className="text-lg sm:text-xl font-bold text-[#a8ffd2] flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#4edea3]">verified</span>
                          {activeCard.backTitle}
                        </h3>

                        <div className="text-xs sm:text-sm text-[#dfe2ee] whitespace-pre-line leading-relaxed font-sans bg-[#0a0e16]/60 p-4 rounded-xl border border-[#334155]/40">
                          {activeCard.backContent}
                        </div>

                        {activeCard.cliExample && (
                          <div className="flex flex-col gap-1 mt-1">
                            <span className="text-[10px] font-mono text-[#00daf3] uppercase tracking-wider flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">terminal</span>
                              Extrait CLI Officiel :
                            </span>
                            <pre className="bg-[#05080e] p-3 rounded-lg border border-[#00e5ff]/30 text-xs font-mono text-[#a8ffd2] overflow-x-auto">
                              {activeCard.cliExample}
                            </pre>
                          </div>
                        )}

                        {activeCard.rfcRef && (
                          <div className="flex items-center gap-2 text-[11px] font-mono text-[#849396] mt-1">
                            <span className="material-symbols-outlined text-sm text-[#00e5ff]">menu_book</span>
                            <span>Référence normative : <strong className="text-[#00daf3]">{activeCard.rfcRef}</strong></span>
                          </div>
                        )}

                        {/* Interactive Cloud Glossary & Encyclopedia Bridge */}
                        {matchedCloudTerms.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-[#00363d]/40 border border-[#00e5ff]/40 mt-2">
                            <span className="text-[10px] font-mono font-bold text-[#00e5ff] uppercase flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">cloud_sync</span>
                              Liaison Glossaire &amp; Cloud :
                            </span>
                            {matchedCloudTerms.map((ct) => (
                              <button
                                key={ct.id}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onOpenCloudTerm) {
                                    onOpenCloudTerm(ct.id);
                                  } else {
                                    onNavigate?.('glossaire-cloud');
                                  }
                                }}
                                className="px-2.5 py-1 rounded bg-[#0f131c] hover:bg-[#262a33] text-xs font-mono text-[#a8ffd2] hover:text-[#00e5ff] border border-[#334155] hover:border-[#00e5ff]/60 transition-all flex items-center gap-1.5 shadow-sm"
                                title="Ouvrir la fiche complète dans le glossaire cloud"
                              >
                                <span className="material-symbols-outlined text-[13px]">dictionary</span>
                                <span>{ct.acronym || ct.term.split('—')[0].trim()}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Hint Bar */}
                  <div className="pt-4 border-t border-[#334155]/40 flex items-center justify-between text-[11px] font-mono text-[#849396]">
                    <span>Appuyez sur [Espace] ou cliquez pour retourner</span>
                    <span className="hidden sm:inline">Raccourcis : [←] Précédent • [→] Suivant</span>
                  </div>
                </div>
              )}

              {/* LEITNER INTERVAL RATING BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#181c24] border border-[#334155]/40 rounded-2xl">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handlePrev}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#0f131c] hover:bg-[#262a33] text-[#dfe2ee] border border-[#334155]/40 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    <span>Précédente</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#0f131c] hover:bg-[#262a33] text-[#dfe2ee] border border-[#334155]/40 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Suivante</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>

                {/* Rating Level buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleRate('review')}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#3d1214] hover:bg-[#521b1e] text-[#ffb4ab] border border-[#ffb4ab]/40 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#ffb4ab]" />
                    <span>[1] À revoir (10 min)</span>
                  </button>

                  <button
                    onClick={() => handleRate('good')}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#2e2600] hover:bg-[#3d3300] text-[#ffcc00] border border-[#ffcc00]/40 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#ffcc00]" />
                    <span>[2] Correct (Demain)</span>
                  </button>

                  <button
                    onClick={() => handleRate('mastered')}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#003822] hover:bg-[#004d2f] text-[#4edea3] border border-[#4edea3]/40 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(78,222,163,0.3)]"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
                    <span>[3] Maîtrisé (4 jours)</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* =========================================================================
          MODE 2: REPERTOIRE / GRID VIEW
          ========================================================================= */}
      {displayMode === 'grid' && (
        <div className="flex flex-col gap-4">
          {filteredCards.length === 0 ? (
            <div className="bg-[#181c24] border border-[#334155]/40 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-4">
              <span className="material-symbols-outlined text-5xl text-[#00e5ff]">
                {searchQuery ? 'search_off' : 'style'}
              </span>
              <h3 className="text-lg font-bold text-[#dfe2ee]">
                {searchQuery
                  ? `Aucun résultat pour "${searchQuery}"`
                  : 'Aucune flashcard ne correspond aux filtres'}
              </h3>
              <p className="text-xs text-[#bac9cc] max-w-md leading-relaxed">
                {searchQuery ? (
                  cardsInSelectedModule.length > 0 ? (
                    <>
                      Le module sélectionné (<strong>{moduleOptions.find((m) => m.id === selectedModule)?.label || selectedModule}</strong>) comprend <strong>{cardsInSelectedModule.length} flashcards</strong>, mais aucune ne contient le terme <em>"{searchQuery}"</em>.
                    </>
                  ) : (
                    <>Aucune flashcard ne contient le terme <em>"{searchQuery}"</em> dans la sélection actuelle.</>
                  )
                ) : (
                  <>Essayez de réinitialiser vos critères de recherche ou sélectionnez un autre module pour explorer les questions disponibles.</>
                )}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 bg-[#00e5ff] text-[#00363d] font-bold rounded-lg hover:brightness-110 flex items-center gap-1.5 shadow-[0_0_14px_rgba(0,229,255,0.4)]"
                  >
                    <span className="material-symbols-outlined text-sm">clear</span>
                    Effacer la recherche {cardsInSelectedModule.length > 0 ? `(Voir les ${cardsInSelectedModule.length} cartes)` : ''}
                  </button>
                )}
                {searchQuery && selectedModule !== 'all' && (
                  <button
                    onClick={() => {
                      setSelectedModule('all');
                      setVendorFilter('all');
                    }}
                    className="px-3.5 py-2 bg-[#262a33] text-[#dfe2ee] font-semibold rounded-lg hover:bg-[#334155] border border-[#334155]"
                  >
                    Rechercher "{searchQuery}" dans tous les modules
                  </button>
                )}
                <button
                  onClick={() => {
                    setVendorFilter('all');
                    setSelectedModule('all');
                    setStatusFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-3.5 py-2 bg-[#181c24] text-[#849396] hover:text-[#dfe2ee] rounded-lg hover:bg-[#262a33] border border-[#334155]/40"
                >
                  Réinitialiser tous les filtres
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs font-mono text-[#849396]">
                <span>Affichage de {filteredCards.length} cartes mémo répertoriées</span>
                <span>Cliquez sur une carte pour lancer l'étude en plein écran</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCards.map((card, idx) => {
                  const isMastered = masteredIds.has(card.id);
                  const isReview = reviewIds.has(card.id);
                  const isFav = favoriteIds.has(card.id);

                  return (
                    <div
                      key={card.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setDisplayMode('focus');
                        setIsFlipped(false);
                      }}
                      className="bg-[#181c24] border border-[#334155]/40 hover:border-[#00e5ff] rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-xl group flex flex-col justify-between gap-3 relative"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {card.moduleCode && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-[#00363d] text-[#00e5ff] border border-[#00e5ff]/40">
                                {card.moduleCode}
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-[#849396] truncate max-w-[140px]">
                              {card.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => handleToggleFavorite(card.id, e)}
                              className="text-[#849396] hover:text-[#ffcc00] p-1"
                            >
                              <span className="material-symbols-outlined text-base">
                                {isFav ? 'star' : 'star_border'}
                              </span>
                            </button>
                            {isMastered && (
                              <span className="material-symbols-outlined text-sm text-[#4edea3]" title="Maîtrisée">
                                verified
                              </span>
                            )}
                            {isReview && (
                              <span className="material-symbols-outlined text-sm text-[#ffb4ab]" title="À revoir">
                                sync_problem
                              </span>
                            )}
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors line-clamp-2">
                          {card.frontTitle}
                        </h4>

                        <p className="text-xs text-[#bac9cc] line-clamp-3 leading-relaxed">
                          {card.frontPrompt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#334155]/30 flex items-center justify-between text-[10px] font-mono text-[#849396]">
                        <span>{card.difficulty}</span>
                        <span className="text-[#00e5ff] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Étudier <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* =========================================================================
          MODE 3: CHRONO-BLITZ 2 MIN
          ========================================================================= */}
      {displayMode === 'blitz' && (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
          {/* Blitz Header Card */}
          <div className="bg-gradient-to-r from-[#2a1314] via-[#1c1824] to-[#181c24] border border-[#ffb4ab]/40 rounded-2xl p-5 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#690005] border border-[#ffb4ab] flex items-center justify-center text-[#ffb4ab] text-2xl font-bold">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono uppercase text-[#ffb4ab] font-bold tracking-wider">
                  Chrono-Blitz • Réflexe Réseau
                </span>
                <h3 className="text-lg font-bold text-[#dfe2ee]">
                  Révisez un maximum de cartes en 120 secondes
                </h3>
              </div>
            </div>

            <div className="flex flex-col items-end font-mono">
              <span className="text-2xl font-black text-[#ffb4ab]">
                {Math.floor(blitzTimeLeft / 60)}:{String(blitzTimeLeft % 60).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-[#849396]">Temps restant</span>
            </div>
          </div>

          {blitzTimeLeft > 0 && activeCard ? (
            /* Active Blitz Card */
            <div className="bg-[#181c24] border-2 border-[#ffb4ab]/50 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#334155]/40 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-[#00363d] text-[#00e5ff] font-bold">
                  {activeCard.moduleCode || activeCard.category}
                </span>
                <span className="text-[#a8ffd2]">
                  Score : {blitzScore.correct} validées • {blitzScore.review} revues
                </span>
              </div>

              <div
                onClick={() => setIsFlipped((prev) => !prev)}
                className="cursor-pointer min-h-[220px] flex flex-col justify-center"
              >
                {!isFlipped ? (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-[#dfe2ee]">{activeCard.frontTitle}</h3>
                    <p className="text-sm text-[#bac9cc] leading-relaxed">{activeCard.frontPrompt}</p>
                    <span className="text-xs font-mono text-[#00e5ff] mt-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">touch_app</span> Cliquez pour voir la réponse
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 animate-fadeIn">
                    <h4 className="text-base font-bold text-[#4edea3]">{activeCard.backTitle}</h4>
                    <p className="text-xs sm:text-sm text-[#dfe2ee] leading-relaxed whitespace-pre-line bg-[#0a0e16]/80 p-3 rounded-lg border border-[#334155]/30">
                      {activeCard.backContent}
                    </p>
                  </div>
                )}
              </div>

              {/* Fast Blitz Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#334155]/40">
                <button
                  onClick={() => handleRate('review')}
                  className="py-3 rounded-xl bg-[#3d1214] hover:bg-[#521b1e] text-[#ffb4ab] border border-[#ffb4ab]/40 font-mono text-xs font-bold transition-all"
                >
                  À revoir (-0 pt)
                </button>
                <button
                  onClick={() => handleRate('mastered')}
                  className="py-3 rounded-xl bg-[#003822] hover:bg-[#004d2f] text-[#4edea3] border border-[#4edea3]/40 font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(78,222,163,0.3)]"
                >
                  Je la connais ! (+1 pt)
                </button>
              </div>
            </div>
          ) : (
            /* Blitz Results Summary */
            <div className="bg-[#181c24] border border-[#334155]/40 rounded-3xl p-8 text-center flex flex-col items-center gap-4">
              <span className="text-5xl">🏆</span>
              <h3 className="text-2xl font-bold text-[#dfe2ee]">Session Blitz Terminée !</h3>
              <p className="text-sm text-[#bac9cc]">
                Vous avez répondu à {blitzScore.correct + blitzScore.review} cartes mémo en 2 minutes.
              </p>
              <div className="flex items-center gap-6 font-mono my-2">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#4edea3]">{blitzScore.correct}</div>
                  <div className="text-[11px] text-[#849396] uppercase">Correctes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#ffb4ab]">{blitzScore.review}</div>
                  <div className="text-[11px] text-[#849396] uppercase">À revoir</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleStartBlitz}
                  className="px-5 py-2.5 bg-[#00e5ff] text-[#00363d] font-mono text-xs font-bold rounded-xl hover:brightness-110"
                >
                  Recommencer un Blitz
                </button>
                <button
                  onClick={() => setDisplayMode('focus')}
                  className="px-5 py-2.5 bg-[#0f131c] text-[#bac9cc] hover:text-[#dfe2ee] font-mono text-xs rounded-xl border border-[#334155]/40"
                >
                  Retour au mode normal
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          MODE 4: CREATE CUSTOM FLASHCARD
          ========================================================================= */}
      {displayMode === 'create' && (
        <div className="bg-[#181c24] border border-[#334155]/40 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto w-full flex flex-col gap-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#334155]/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#003822] text-[#4edea3] flex items-center justify-center text-xl font-bold border border-[#4edea3]/40">
                <span className="material-symbols-outlined">add_card</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-[#dfe2ee]">Créer une Flashcard Personnalisée</h3>
                <p className="text-xs text-[#bac9cc]">
                  Ajoutez vos propres fiches d'étude (enregistrées localement dans votre navigateur).
                </p>
              </div>
            </div>

            <button
              onClick={() => setDisplayMode('focus')}
              className="text-[#849396] hover:text-[#dfe2ee] text-xs font-mono"
            >
              Annuler
            </button>
          </div>

          <form onSubmit={handleCreateCard} className="flex flex-col gap-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#849396] uppercase">Code Module</label>
                <select
                  value={newCard.moduleCode}
                  onChange={(e) => {
                    const code = e.target.value;
                    const found = moduleOptions.find((m) => m.id === code);
                    setNewCard((prev) => ({
                      ...prev,
                      moduleCode: code,
                      moduleName: found ? found.label : code,
                    }));
                  }}
                  className="bg-[#0f131c] border border-[#334155]/40 rounded-lg p-2 text-[#dfe2ee] focus:border-[#00e5ff] focus:outline-none"
                >
                  <option value="CCNA-D1">CCNA-D1 (Network Fundamentals)</option>
                  <option value="CCNA-D2">CCNA-D2 (Network Access)</option>
                  <option value="CCNA-D3">CCNA-D3 (IP Connectivity)</option>
                  <option value="CCNA-D4">CCNA-D4 (IP Services)</option>
                  <option value="CCNA-D5">CCNA-D5 (Security Fundamentals)</option>
                  <option value="CCNA-D6">CCNA-D6 (Automation &amp; SDN)</option>
                  <option value="ENCOR-D1">ENCOR-D1 (Architecture)</option>
                  <option value="ENCOR-D2">ENCOR-D2 (Virtualization &amp; SD-WAN)</option>
                  <option value="ENCOR-D3">ENCOR-D3 (Infrastructure &amp; Wireless)</option>
                  <option value="ENCOR-D4">ENCOR-D4 (Network Assurance)</option>
                  <option value="ENCOR-D5">ENCOR-D5 (Security &amp; Zero Trust)</option>
                  <option value="ENCOR-D6">ENCOR-D6 (Automation &amp; Programmability)</option>
                  <option value="ENARSI-D1">ENARSI-D1 (Advanced Routing)</option>
                  <option value="ENARSI-D2">ENARSI-D2 (VPN Technologies)</option>
                  <option value="ENARSI-D3">ENARSI-D3 (Infrastructure Security)</option>
                  <option value="ENARSI-D4">ENARSI-D4 (Infrastructure Services)</option>
                  <option value="SCOR-D1">SCOR-D1 (Security Concepts &amp; Threats)</option>
                  <option value="SCOR-D2">SCOR-D2 (Network Security &amp; Firewalls)</option>
                  <option value="SCOR-D3">SCOR-D3 (Cloud Security &amp; SaaS)</option>
                  <option value="SCOR-D4">SCOR-D4 (Content Security ESA/WSA/Umbrella)</option>
                  <option value="SCOR-D5">SCOR-D5 (Endpoint Protection &amp; Detection)</option>
                  <option value="SCOR-D6">SCOR-D6 (Network Access, Visibility &amp; ISE)</option>
                  <option value="PCNSE-D1">PCNSE-D1 (Planning &amp; Core Architecture)</option>
                  <option value="PCNSE-D2">PCNSE-D2 (Deploy &amp; Configure Core Components)</option>
                  <option value="PCNSE-D3">PCNSE-D3 (Security &amp; NAT Policies)</option>
                  <option value="PCNSE-D4">PCNSE-D4 (GlobalProtect &amp; User-ID)</option>
                  <option value="PCNSE-D5">PCNSE-D5 (Manage &amp; Troubleshoot)</option>
                  <option value="PCNSE-D6">PCNSE-D6 (Panorama &amp; Centralized Mgmt)</option>
                  <option value="FCP-D1">FCP-D1 (Fortinet System &amp; Network)</option>
                  <option value="FCP-D2">FCP-D2 (Fortinet Security Profiles &amp; Policies)</option>
                  <option value="FCP-D3">FCP-D3 (Fortinet Auth, ZTNA &amp; IPsec)</option>
                  <option value="FCP-D4">FCP-D4 (Fortinet HA &amp; Diagnostics)</option>
                  <option value="SECPLUS-D1">SECPLUS-D1 (CompTIA Security+)</option>
                  <option value="JNCIA-D1">JNCIA-D1 (Juniper Junos)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#849396] uppercase">Difficulté</label>
                <select
                  value={newCard.difficulty}
                  onChange={(e) =>
                    setNewCard((prev) => ({
                      ...prev,
                      difficulty: e.target.value as 'Fondamental' | 'Intermédiaire' | 'Avancé',
                    }))
                  }
                  className="bg-[#0f131c] border border-[#334155]/40 rounded-lg p-2 text-[#dfe2ee] focus:border-[#00e5ff] focus:outline-none"
                >
                  <option value="Fondamental">Fondamental</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#849396] uppercase">Thématique / Catégorie</label>
                <input
                  type="text"
                  value={newCard.category}
                  onChange={(e) => setNewCard((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder="Ex: Routage OSPF, Tag 802.1Q"
                  className="bg-[#0f131c] border border-[#334155]/40 rounded-lg p-2 text-[#dfe2ee] focus:border-[#00e5ff] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#849396] uppercase">Titre Recto (Sujet)</label>
              <input
                type="text"
                required
                value={newCard.frontTitle}
                onChange={(e) => setNewCard((prev) => ({ ...prev, frontTitle: e.target.value }))}
                placeholder="Ex: Différence entre E1 et E2 en OSPF"
                className="bg-[#0f131c] border border-[#334155]/40 rounded-lg p-2 text-[#dfe2ee] focus:border-[#00e5ff] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#849396] uppercase">Question / Énoncé Recto</label>
              <textarea
                required
                rows={3}
                value={newCard.frontPrompt}
                onChange={(e) => setNewCard((prev) => ({ ...prev, frontPrompt: e.target.value }))}
                placeholder="Posez la question technique précise..."
                className="bg-[#0f131c] border border-[#334155]/40 rounded-lg p-2 text-[#dfe2ee] focus:border-[#00e5ff] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#849396] uppercase">Réponse &amp; Explication Technique (Verso)</label>
              <textarea
                required
                rows={4}
                value={newCard.backContent}
                onChange={(e) => setNewCard((prev) => ({ ...prev, backContent: e.target.value }))}
                placeholder="Expliquez la règle RFC, le comportement matériel et les pièges d'examen..."
                className="bg-[#0f131c] border border-[#334155]/40 rounded-lg p-2 text-[#dfe2ee] focus:border-[#00e5ff] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#849396] uppercase">Commande CLI (Optionnelle)</label>
                <input
                  type="text"
                  value={newCard.cliExample}
                  onChange={(e) => setNewCard((prev) => ({ ...prev, cliExample: e.target.value }))}
                  placeholder="Ex: show ip ospf database external"
                  className="bg-[#0f131c] border border-[#334155]/40 rounded-lg p-2 text-[#dfe2ee] focus:border-[#00e5ff] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#849396] uppercase">Référence RFC / Norme (Optionnelle)</label>
                <input
                  type="text"
                  value={newCard.rfcRef}
                  onChange={(e) => setNewCard((prev) => ({ ...prev, rfcRef: e.target.value }))}
                  placeholder="Ex: RFC 2328 § 16.4"
                  className="bg-[#0f131c] border border-[#334155]/40 rounded-lg p-2 text-[#dfe2ee] focus:border-[#00e5ff] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#849396] uppercase">Indice Mnémotechnique</label>
              <input
                type="text"
                value={newCard.hint}
                onChange={(e) => setNewCard((prev) => ({ ...prev, hint: e.target.value }))}
                placeholder="Astuce pour s'en souvenir facilement..."
                className="bg-[#0f131c] border border-[#334155]/40 rounded-lg p-2 text-[#dfe2ee] focus:border-[#00e5ff] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#334155]/40">
              <button
                type="button"
                onClick={() => setDisplayMode('focus')}
                className="px-4 py-2 text-[#849396] hover:text-[#dfe2ee]"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#00e5ff] text-[#00363d] font-bold rounded-xl hover:brightness-110 shadow-[0_0_14px_rgba(0,229,255,0.4)] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">save</span>
                <span>Enregistrer la Flashcard</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* QUICK SHORTCUTS CHEATSHEET FOOTER */}
      <div className="bg-[#0a0e16]/80 border border-[#334155]/30 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#849396]">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[#00e5ff] font-bold">Raccourcis Clavier :</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#181c24] border border-[#334155] text-[#dfe2ee]">Espace</kbd> Retourner</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#181c24] border border-[#334155] text-[#dfe2ee]">←</kbd> Précédente</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#181c24] border border-[#334155] text-[#dfe2ee]">→</kbd> Suivante</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#181c24] border border-[#334155] text-[#dfe2ee]">1</kbd> À revoir</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#181c24] border border-[#334155] text-[#dfe2ee]">2</kbd> Correct</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#181c24] border border-[#334155] text-[#dfe2ee]">3</kbd> Maîtrisé</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[#181c24] border border-[#334155] text-[#dfe2ee]">H</kbd> Indice</span>
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('ateliers-et-labs')}
            className="text-[#00daf3] hover:underline flex items-center gap-1"
          >
            <span>Voir aussi tous les Ateliers &amp; Labs</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};
