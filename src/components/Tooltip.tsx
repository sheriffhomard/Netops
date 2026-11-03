import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  title?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
  title,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVisible(false);
    };
    if (isVisible) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isVisible]);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }[position];

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      role="tooltip"
      aria-label={content}
    >
      {children ? (
        children
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(!isVisible);
          }}
          className="text-[#849396] hover:text-[#00e5ff] transition-colors p-0.5 rounded cursor-help inline-flex items-center justify-center focus:outline-none"
          title="Aide et explication"
        >
          <span className="material-symbols-outlined text-sm">help_outline</span>
        </button>
      )}

      {isVisible && (
        <div
          className={`absolute z-50 w-64 p-2.5 bg-[#181c24] text-[#dfe2ee] text-xs rounded-xl border border-[#334155] shadow-xl pointer-events-none animate-in fade-in zoom-in-95 duration-150 ${positionClasses}`}
        >
          {title && (
            <div className="font-semibold text-[11px] font-mono text-[#00e5ff] uppercase tracking-wider mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">info</span>
              <span>{title}</span>
            </div>
          )}
          <p className="text-[11px] leading-relaxed text-[#bac9cc]">{content}</p>
        </div>
      )}
    </div>
  );
};

export const FieldHelper: React.FC<{
  label: string;
  helpText: string;
  badge?: string;
  className?: string;
}> = ({ label, helpText, badge, className = '' }) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="text-xs font-mono uppercase tracking-wider text-[#849396]">{label}</span>
      {badge && (
        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00363d]/50 text-[#00e5ff] border border-[#00e5ff]/30">
          {badge}
        </span>
      )}
      <Tooltip content={helpText} title={label} />
    </div>
  );
};
