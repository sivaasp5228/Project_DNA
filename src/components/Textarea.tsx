import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-zinc-300 select-none">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full bg-zinc-950/80 border text-sm rounded-lg py-2.5 px-3.5 transition-all duration-200 focus:outline-none focus:ring-1 resize-y',
            error
              ? 'border-red-500/80 text-red-100 placeholder-red-400/50 focus:border-red-500 focus:ring-red-500/30'
              : 'border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-zinc-700 focus:ring-zinc-700/50 focus:bg-zinc-950',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-500 mt-0.5">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
