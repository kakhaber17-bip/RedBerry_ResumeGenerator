interface IconProps {
  className?: string;
}

export function ListIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="4" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="10" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="16" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}