import React, { useState, ChangeEvent, useRef, useImperativeHandle, forwardRef } from 'react';

interface NumericInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string | number;
  onChange?: (value: string) => void;
}

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ className = '', value = '', onChange, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const formatValue = (val: string) => {
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const [displayValue, setDisplayValue] = useState(formatValue(String(value)));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const selectionStart = input.selectionStart || 0;
      const previousLength = input.value.length;

      const rawValue = input.value.replace(/\D/g, '');
      const formattedValue = formatValue(rawValue);

      setDisplayValue(formattedValue);

      if (onChange) {
        onChange(rawValue);
      }

      requestAnimationFrame(() => {
        if (inputRef.current) {
          const diff = formattedValue.length - previousLength;
          const newCursorPos = Math.max(0, selectionStart + diff);
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      });
    };

    return (
      <div className="relative inline-grid min-w-[72px] items-center">
        <span
          className={`invisible col-start-1 row-start-1 whitespace-pre px-3 py-1.5 font-sans text-base ${className}`}
          aria-hidden="true"
        >
          {displayValue || props.placeholder || ''}
        </span>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric" 
          value={displayValue}
          onChange={handleChange}
          className={`col-start-1 row-start-1 w-full min-w-[72px] rounded-lg border border-gray-300 px-3 py-1.5 font-sans text-base text-gray-900 outline-none transition-colors focus:border-purple-600 focus:ring-2 focus:ring-purple-200 ${className}`}
          {...props}
        />
      </div>
    );
  }
);

NumericInput.displayName = 'NumericInput';