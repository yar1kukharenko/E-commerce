import React from 'react';

type UseOnDocumentClickProps = {
  ref: React.RefObject<HTMLDivElement | null>;
  onOutsideClick: () => void;
};

export const useOutsideClick = ({ ref, onOutsideClick }: UseOnDocumentClickProps) => {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};