import React from 'react';
import { Filter } from 'lucide-react';
import { cn } from '../lib/utils';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  selectedValue,
  onChange,
  label,
  className
}) => {
  return (
    <div className={cn("relative flex items-center bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 gap-2 hover:border-zinc-700 transition-colors", className)}>
      <Filter className="h-4 w-4 text-zinc-500" />
      {label && <span className="text-[11px] font-medium text-zinc-400 select-none">{label}:</span>}
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer pr-4 appearance-none font-medium"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2371717a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right -4px center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '16px 16px'
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-zinc-900 text-zinc-200">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
