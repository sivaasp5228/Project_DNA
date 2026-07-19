import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className
}) => {
  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <Search className="absolute left-3.5 h-4.5 w-4.5 text-zinc-500 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-950 border border-zinc-800 text-xs rounded-lg py-2 pl-10 pr-9 text-zinc-100 placeholder-zinc-500 transition-colors focus:outline-none focus:border-zinc-700"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 p-0.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-md transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
