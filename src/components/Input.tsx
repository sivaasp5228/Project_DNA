import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-zinc-300 select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-zinc-500 pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              'w-full bg-zinc-950/80 border text-sm rounded-lg py-2.5 transition-all duration-200 focus:outline-none focus:ring-1',
              leftIcon ? 'pl-10' : 'pl-3.5',
              rightIcon ? 'pr-10' : 'pr-3.5',
              error
                ? 'border-red-500/80 text-red-100 placeholder-red-400/50 focus:border-red-500 focus:ring-red-500/30'
                : 'border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-zinc-700 focus:ring-zinc-700/50 focus:bg-zinc-950',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-zinc-500 pointer-events-none flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-red-500 mt-0.5">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
