import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { toast } from 'sonner';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    // Sync with html class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    toast.success(`Switched to ${!isDark ? 'Dark' : 'Light'} Mode`, {
      description: 'The layout theme has been updated.',
      duration: 1500
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-all focus:outline-none"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="h-4.5 w-4.5" />
      ) : (
        <Moon className="h-4.5 w-4.5" />
      )}
    </button>
  );
};
