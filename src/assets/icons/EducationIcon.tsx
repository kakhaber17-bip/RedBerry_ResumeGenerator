interface IconProps {
  className?: string;
}

export function EducationIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* აკადემიური ქუდი */}
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      {/* ქუდის ლენტი */}
      <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
      {/* ჩამოკიდებული ლენტი */}
      <line x1="22" y1="10" x2="22" y2="16" />
    </svg>
  );
}