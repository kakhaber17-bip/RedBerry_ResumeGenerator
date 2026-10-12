import type { TextareaHTMLAttributes, ChangeEvent } from 'react';
import { CheckIcon } from '../../assets/icons/CheckIcon';
import { WarningIcon } from '../../assets/icons/WarningIcon';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  touched?: boolean;
  hint?: string;
}

export function TextArea({ label, name, error, touched, hint, onChange, ...props }: TextAreaProps){
  const value = props.value as string;
  const isValid = touched && !error && value;
  const isError = touched && !!error;

  const borderClass = isError ? 'border-red-500'
    : isValid ? 'border-green-500' : 'border-gray-300';

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>)=>{
    e.target.value = e.target.value.replace(/^\s+/, '');
    if (onChange) onChange(e);
  };

  return(
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="text-sm font-bold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <textarea {...props} id={name} name={name} onChange={handleChange}
          className={`w-full p-2 border rounded-md outline-none resize-none transition-colors focus:border-purple-500 ${borderClass}`}/>
        {isValid && (
          <span className="absolute right-3 bottom-3 text-green-500 pointer-events-none">
            <CheckIcon/>
          </span>
        )}
        {isError && (
          <span className="absolute right-3 bottom-3 text-red-500 pointer-events-none">
            <WarningIcon />
          </span>
        )}
      </div>
      {hint && !isError && <span className="text-xs text-gray-500">{hint}</span>}
      {isError && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}