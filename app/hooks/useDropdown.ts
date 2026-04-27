import { useCallback, useEffect, useRef, useState } from 'react';

export function useDropdown(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, optionCount: number, onSelect: (index: number) => void) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(0);
        } else {
          setActiveIndex(i => (i + 1) % optionCount);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(optionCount - 1);
        } else {
          setActiveIndex(i => (i - 1 + optionCount) % optionCount);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && activeIndex >= 0) {
          onSelect(activeIndex);
          setIsOpen(false);
        } else {
          setIsOpen(true);
          setActiveIndex(0);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Home':
        if (isOpen) { e.preventDefault(); setActiveIndex(0); }
        break;
      case 'End':
        if (isOpen) { e.preventDefault(); setActiveIndex(optionCount - 1); }
        break;
    }
  }, [isOpen, activeIndex]);

  return {
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    dropdownRef,
    toggle: () => { setIsOpen(prev => !prev); setActiveIndex(-1); },
    close: () => setIsOpen(false),
    handleKeyDown,
  };
}
