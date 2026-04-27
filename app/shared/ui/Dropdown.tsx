import { useId, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useDropdown } from '../../hooks/useDropdown';

interface DropdownOption {
  id: string;
  name: string;
  nombre?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  placeholder?: string;
  className?: string;
}

export function Dropdown({ options, selectedId, onSelect, placeholder = "Seleccionar...", className = "" }: DropdownProps) {
  const { isOpen, setIsOpen, activeIndex, setActiveIndex, dropdownRef, toggle, handleKeyDown } = useDropdown();
  const listboxId = useId();
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedOption = options.find(o => o.id === selectedId);
  const getDisplayName = (option: DropdownOption) => option.nombre || option.name;

  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, activeIndex]);

  const selectByIndex = (index: number) => {
    onSelect(options[index].id);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={toggle}
        onKeyDown={(e) => handleKeyDown(e, options.length, selectByIndex)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer ${
          isOpen
            ? 'border-brand-primary bg-slate-50'
            : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
        }`}
      >
        <span className="font-bold text-sm text-brand-primary">{selectedOption ? getDisplayName(selectedOption) : placeholder}</span>
        <ChevronDown size={16} className={`text-brand-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Opciones"
          className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-brand-secondary border border-brand-secondary rounded-xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          {options.map((option, index) => (
            <li key={option.id} role="option" aria-selected={selectedId === option.id}>
              <button
                ref={(el) => { optionRefs.current[index] = el; }}
                type="button"
                onClick={() => { onSelect(option.id); setIsOpen(false); }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors border-b border-white/5 last:border-none cursor-pointer ${
                  index === activeIndex ? 'bg-white/20' : selectedId === option.id ? 'bg-white/15' : 'hover:bg-white/10'
                }`}
              >
                <span className={`font-semibold ${selectedId === option.id || index === activeIndex ? 'text-white' : 'text-slate-200'}`}>
                  {getDisplayName(option)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
