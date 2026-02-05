import { useEffect, useRef, useState } from 'react';

export function useDropdown(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
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

  return {
    isOpen,
    setIsOpen,
    dropdownRef,
    toggle: () => setIsOpen(!isOpen),
    close: () => setIsOpen(false)
  };
}
