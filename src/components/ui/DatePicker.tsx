import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CheckIcon } from '../../assets/icons/CheckIcon';
import { WarningIcon } from '../../assets/icons/WarningIcon';

interface DatePickerProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
  hint?: string;
  onChange: (name: string, value: string) => void;
  onBlur?: () => void;
}

export function DatePicker({
  label,
  name,
  value,
  error,
  touched,
  hint,
  onChange,
  onBlur,
}: DatePickerProps) {
  const isValid = touched && !error && value;
  const isError = touched && !!error;

  const borderClass = isError
    ? 'border-red-500'
    : isValid
    ? 'border-green-500'
    : 'border-gray-300';

  const selectedDate = value ? new Date(value) : null;

  const handleChange = (date: Date | null) => {
    if (!date) {
      onChange(name, '');
      return;
    }
    const iso = date.toISOString().split('T')[0];
    onChange(name, iso);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <div className="relative">
        <ReactDatePicker
          selected={selectedDate}
          onChange={handleChange}
          onBlur={onBlur}
          dateFormat="dd/MM/yyyy"
          placeholderText="აირჩიე თარიღი"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          yearDropdownItemNumber={80}
          scrollableYearDropdown
          className={`w-full p-2 border rounded-md outline-none transition-colors focus:border-purple-500 ${borderClass}`}
          calendarClassName="shadow-lg"
        />
        {isValid && (
          <span className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none z-10">
            <CheckIcon />
          </span>
        )}
        {isError && (
          <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none z-10">
            <WarningIcon />
          </span>
        )}
      </div>
      {hint && !isError && <span className="text-xs text-gray-500">{hint}</span>}
      {isError && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}