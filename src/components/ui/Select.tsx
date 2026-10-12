import type { SelectHTMLAttributes } from 'react';
import { CheckIcon } from '../../assets/icons/CheckIcon';
import { WarningIcon } from '../../assets/icons/WarningIcon';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  touched?: boolean;
  hint?: string;
  placeholder?: string;
  options: Option[];
}

export function Select({
  label,
  name,
  error,
  touched,
  hint,
  placeholder = 'აირჩიე',
  options,
  ...props
}: SelectProps) {
  const value = props.value as string;
  const isValid = touched && !error && value;
  const isError = touched && !!error;

  const borderClass = isError ? 'border-red-500'
    : isValid ? 'border-green-500' : 'border-gray-300';

  return(
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="text-sm font-bold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select {...props} id={name} name={name}
          className={`w-full p-2 pr-10 border rounded-md outline-none bg-white transition-colors focus:border-purple-500 ${borderClass}`}>
          <option value="">{placeholder}</option>
          {options.map((opt)=>(
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {isValid && (
          <span className="absolute right-8 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
            <CheckIcon/>
          </span>
        )}
        {isError && (
          <span className="absolute right-8 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
            <WarningIcon/>
          </span>
        )}
      </div>
      {hint && !isError && <span className="text-xs text-gray-500">{hint}</span>}
      {isError && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}