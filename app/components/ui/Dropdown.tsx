import { ChevronDown } from 'lucide-react';
import { useDropdown } from '../../hooks/useDropdown';
import { COLORS } from '../../constants/colors';

interface DropdownOption {
  id: string;
  name: string;
  nombre?: string; // Para compatibilidad con datos existentes
}

interface DropdownProps {
  options: DropdownOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  placeholder?: string;
  className?: string;
}

export function Dropdown({ options, selectedId, onSelect, placeholder = "Seleccionar...", className = "" }: DropdownProps) {
  const { isOpen, setIsOpen, dropdownRef, toggle } = useDropdown();
  
  const selectedOption = options.find(o => o.id === selectedId);

  const getDisplayName = (option: DropdownOption) => option.nombre || option.name;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggle}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer ${
          isOpen 
            ? 'border-[#1a3a52] bg-[#f8fafc]'
            : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
        }`}
      >
        <span className="font-bold text-sm text-[#1a3a52]">{selectedOption ? getDisplayName(selectedOption) : placeholder}</span>
        <ChevronDown size={16} className={`text-[#1a3a52] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-[#2d5a7b] border border-[#2d5a7b] rounded-xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-top-1">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onSelect(option.id);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors border-b border-white/5 last:border-none cursor-pointer ${
                selectedId === option.id ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <span className={`font-semibold ${selectedId === option.id ? 'text-white' : 'text-slate-200'}`}>
                {getDisplayName(option)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
