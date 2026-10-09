import type { InputHTMLAttributes, ChangeEvent, FocusEvent } from 'react';
import { CheckIcon } from '../../assets/icons/CheckIcon';
import { WarningIcon } from '../../assets/icons/WarningIcon';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> {
  label: string;
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
  hint?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export function Input({ label, name, value, error, touched, hint, onChange, onBlur, ...props }: InputProps) {
  const isValid = touched && !error && value;
  const isError = touched && !!error;

  const borderClass = isError
    ? 'border-red-500'
    : isValid
    ? 'border-green-500'
    : 'border-gray-300';

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="text-sm font-bold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input {...props} id={name}  name={name} value={value}
          onChange={onChange} onBlur={onBlur}
          className={`w-full p-2 border rounded-md outline-none transition-colors focus:border-purple-500 ${borderClass}`} />
        {isValid && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <CheckIcon />
          </span>
        )}
        {isError && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <WarningIcon />
          </span>
        )}
      </div>
      {hint && !isError && <span className="text-xs text-gray-500">{hint}</span>}
      {isError && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}