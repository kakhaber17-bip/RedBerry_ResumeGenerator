import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary: 'bg-purple-600 text-white hover:bg-purple-800',
  secondary: 'bg-blue-400 text-white hover:bg-blue-500',
  ghost: 'bg-transparent text-purple-600 hover:bg-purple-50',
};

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return(
    <button
      {...props}
      className={`px-15 py-5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
      ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}