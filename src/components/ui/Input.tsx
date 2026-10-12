import type { InputHTMLAttributes, ChangeEvent } from 'react';
import { CheckIcon } from '../../assets/icons/CheckIcon';
import { WarningIcon } from '../../assets/icons/WarningIcon';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
  hint?: string;
}

export function Input({ label, name, error, touched, hint, onChange, ...props }: InputProps) {
  const value = props.value as string;
  const isDate = props.type === 'date';

  const isValid = !isDate && touched && !error && value;
  const isError = touched && !!error;

  const borderClass = isError ? 'border-red-500'
    : isValid ? 'border-green-500' : 'border-gray-300';

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    e.target.value = e.target.value.replace(/^\s+/, '');
    if(onChange) onChange(e);
  };

  return(
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="text-sm font-bold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input {...props} id={name} name={name} onChange={handleChange}
          className={`w-full p-2 border rounded-md outline-none transition-colors focus:border-purple-500 ${borderClass}`}/>
        {isValid && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
            <CheckIcon/>
          </span>
        )}
        {isError && !isDate && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
            <WarningIcon/>
          </span>
        )}
      </div>
      {hint && !isError && <span className="text-xs text-gray-500">{hint}</span>}
      {isError && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}