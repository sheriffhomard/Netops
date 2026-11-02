import React from 'react';
import { ViewMode } from '../types';
import { getBreadcrumbTrail } from '../utils/navigationConfig';

interface BreadcrumbsProps {
  currentView: ViewMode;
  subTitle?: string;
  onNavigate: (view: ViewMode) => void;
  showBackButton?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentView,
  subTitle,
  onNavigate,
  showBackButton = true,
}) => {
  const trail = getBreadcrumbTrail(currentView, subTitle);

  const handleBack = () => {
    // If on a sub-view, go back to the parent view or dashboard
    if (subTitle && currentView) {
      onNavigate(currentView);
    } else {
      onNavigate('tableau-de-bord');
    }
  };

  return (
    <nav
      aria-label="Fil d'Ariane"
      className="flex items-center gap-2 text-xs font-mono text-[#849396] overflow-x-auto whitespace-nowrap scrollbar-none py-1"
    >
      {showBackButton && currentView !== 'tableau-de-bord' && (
        <button
          onClick={handleBack}
          className="flex items-center gap-1 px-2 py-1 rounded bg-[#181c24] hover:bg-[#262a33] text-[#bac9cc] hover:text-[#00e5ff] border border-[#334155]/40 transition-colors mr-1 cursor-pointer"
          title="Revenir à l'écran précédent"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span className="hidden sm:inline text-[11px]">Retour</span>
        </button>
      )}

      {trail.map((segment, index) => {
        const isLast = index === trail.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-[#3b494c] select-none text-[11px]" aria-hidden="true">
                /
              </span>
            )}
            {segment.view && !isLast ? (
              <button
                onClick={() => onNavigate(segment.view!)}
                className="hover:text-[#00e5ff] hover:underline transition-colors cursor-pointer text-[#bac9cc]"
              >
                {segment.label}
              </button>
            ) : (
              <span
                className={isLast ? 'text-[#dfe2ee] font-semibold' : 'text-[#849396]'}
                aria-current={isLast ? 'page' : undefined}
              >
                {segment.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
