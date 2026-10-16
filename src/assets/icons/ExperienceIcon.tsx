interface IconProps {
  className?: string;
}

export function ExperienceIcon({ className = 'w-5 h-5' }: IconProps) {
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
      {/* გარე წრე — badge */}
      <circle cx="12" cy="8" r="7" />

      {/* ცენტრალური ვარსკვლავი */}
      <polyline
        points="12 4.5 13.5 7.5 16.5 8 14 10.5 15 13.5 12 12 9 13.5 10 10.5 7.5 8 10.5 7.5"
        fill="currentColor"
      />

      {/* ლენტები ქვემოთ */}
      <polyline points="8.5 14.5 6 21 12 19.5 18 21 15.5 14.5" />
    </svg>
  );
}