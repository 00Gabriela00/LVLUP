import React from 'react';

/* ──────────────────────────────────────────────
   LVLUP — Custom SVG Icon System
   Sin emoticonos. Sin paquetes de terceros.
   Iconos vectoriales cyberpunk propios.
   ────────────────────────────────────────────── */

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
  'aria-label'?: string;
}

const iconBase = (
  size: number,
  className: string,
  strokeWidth: number,
  children: React.ReactNode,
  viewBox = '0 0 24 24',
  ariaLabel?: string
) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label={ariaLabel}
    role={ariaLabel ? 'img' : 'presentation'}
    aria-hidden={!ariaLabel}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

export function GamepadIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <rect x="2" y="6" width="20" height="12" rx="4" />
    <path d="M6 12h4m-2-2v4" />
    <circle cx="16" cy="10.5" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="18.5" cy="12" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="16" cy="13.5" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="13.5" cy="12" r="0.75" fill="currentColor" stroke="none" />
  </>, '0 0 24 24', ariaLabel);
}

export function CocktailIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <path d="M7 3l10 0-5 8-5-8z" />
    <path d="M12 11v7" />
    <path d="M9 18h6" />
    <path d="M3 3l1 2" strokeWidth={1.5} />
    <circle cx="4.5" cy="6" r="0.75" fill="currentColor" stroke="none" />
  </>, '0 0 24 24', ariaLabel);
}

export function BurgerIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <path d="M4 11h16" />
    <path d="M4 14h16" />
    <path d="M5 8C5 5.8 7 4 9 4h6c2 0 4 1.8 4 4H5z" />
    <path d="M4 17c0 1.7 1.8 3 4 3h8c2.2 0 4-1.3 4-3H4z" />
  </>, '0 0 24 24', ariaLabel);
}

export function SushiIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <ellipse cx="12" cy="12" rx="9" ry="5" />
    <ellipse cx="12" cy="12" rx="5" ry="2.5" />
    <path d="M3 12c0-1.5 4-3 9-3s9 1.5 9 3" />
    <path d="M3 12c0 1.5 4 3 9 3s9-1.5 9-3" />
  </>, '0 0 24 24', ariaLabel);
}

export function BilliardIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </>, '0 0 24 24', ariaLabel);
}

export function FlameIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <path d="M12 2c0 6-5 7-5 12a5 5 0 0010 0c0-3.5-2-5.5-2-9l-1.5 3C13 8 12 5 12 2z" />
    <path d="M12 14c0 2-1.5 3-1.5 4.5a1.5 1.5 0 003 0C13.5 17 12 16 12 14z" />
  </>, '0 0 24 24', ariaLabel);
}

export function MapPinIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <path d="M12 2C8.7 2 6 4.7 6 8c0 5.25 6 12 6 12s6-6.75 6-12c0-3.3-2.7-6-6-6z" />
    <circle cx="12" cy="8" r="2.5" />
  </>, '0 0 24 24', ariaLabel);
}

export function ClockIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </>, '0 0 24 24', ariaLabel);
}

export function PhoneIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <path d="M6.6 3.5A1 1 0 005 4.4L4.3 7.9c-.1.5.1 1 .5 1.3 8.2 5.8 10.1 7.7 10.4 10.2.1.5.5.8 1 .8l3.2-.8a1 1 0 00.7-1.3C17.6 10.7 12.7 6 6.6 3.5z" />
  </>, '0 0 24 24', ariaLabel);
}

export function WhatsAppIcon({ size = 20, className = '', 'aria-label': ariaLabel }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-hidden={!ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function InstagramIcon({ size = 20, className = '', 'aria-label': ariaLabel }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-hidden={!ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

export function CartIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </>, '0 0 24 24', ariaLabel);
}

export function MenuIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </>, '0 0 24 24', ariaLabel);
}

export function CloseIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>, '0 0 24 24', ariaLabel);
}

export function ArrowRightIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </>, '0 0 24 24', ariaLabel);
}

export function ChevronDownIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <polyline points="6 9 12 15 18 9" />
  </>, '0 0 24 24', ariaLabel);
}

export function StarIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </>, '0 0 24 24', ariaLabel);
}

export function CheckIcon({ size = 20, className = '', strokeWidth = 2.5, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <polyline points="20 6 9 17 4 12" />
  </>, '0 0 24 24', ariaLabel);
}

export function SearchIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </>, '0 0 24 24', ariaLabel);
}

export function TrashIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </>, '0 0 24 24', ariaLabel);
}

export function PlusIcon({ size = 20, className = '', strokeWidth = 2, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </>, '0 0 24 24', ariaLabel);
}

export function MinusIcon({ size = 20, className = '', strokeWidth = 2, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <line x1="5" y1="12" x2="19" y2="12" />
  </>, '0 0 24 24', ariaLabel);
}

export function SnackIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <path d="M6 8h12l-1.5 10H7.5L6 8z" />
    <path d="M4 8h16" />
    <path d="M9 8V5a1 1 0 012 0v3" />
    <path d="M13 8V5a1 1 0 012 0v3" />
  </>, '0 0 24 24', ariaLabel);
}

export function ZapIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </>, '0 0 24 24', ariaLabel);
}

export function TrophyIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <path d="M6 9H4a2 2 0 010-4h2" />
    <path d="M18 9h2a2 2 0 000-4h-2" />
    <path d="M6 5h12v6a6 6 0 01-12 0V5z" />
    <path d="M9 17v3" />
    <path d="M15 17v3" />
    <path d="M7 20h10" />
  </>, '0 0 24 24', ariaLabel);
}

export function QRIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none" />
    <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none" />
    <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none" />
    <path d="M14 14h3v3h-3z" />
    <path d="M17 14h3" />
    <path d="M17 17v3" />
    <path d="M14 17v3" />
  </>, '0 0 24 24', ariaLabel);
}

export function CalendarIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>, '0 0 24 24', ariaLabel);
}

export function DiceIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <rect x="2" y="2" width="20" height="20" rx="4" />
    <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="8" r="1" fill="currentColor" stroke="none" />
    <circle cx="8" cy="16" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="16" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </>, '0 0 24 24', ariaLabel);
}

export function PingPongIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <circle cx="9" cy="9" r="6" />
    <path d="M13.24 13.24l4.24 4.24a2 2 0 002.83-2.83l-4.24-4.24" />
    <circle cx="18" cy="5" r="2" fill="currentColor" stroke="none" />
  </>, '0 0 24 24', ariaLabel);
}

export function ChickenIcon({ size = 20, className = '', strokeWidth = 1.75, 'aria-label': ariaLabel }: IconProps) {
  return iconBase(size, className, strokeWidth, <>
    <path d="M15.5 8.5l-6 6c-2 2-5 2-7 0a4.95 4.95 0 010-7l6-6c2-2 5-2 7 0z" />
    <path d="M18.5 11.5l3 3a2.12 2.12 0 01-3 3l-3-3" />
  </>, '0 0 24 24', ariaLabel);
}

export function LogoIcon({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LVLUP Game Bar Logo"
      role="img"
    >
      <rect width="40" height="40" rx="10" fill="#0A0A10"/>
      <rect x="1" y="1" width="38" height="38" rx="9" stroke="url(#logo-grad)" strokeWidth="1.5" fill="none" />
      <text
        x="50%"
        y="52%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="'Sora', system-ui, sans-serif"
        fontSize="13"
        fontWeight="900"
        fontStyle="italic"
        fill="url(#logo-text-grad)"
        letterSpacing="-0.5"
      >
        LVL
      </text>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E5FF"/>
          <stop offset="1" stopColor="#B500FF"/>
        </linearGradient>
        <linearGradient id="logo-text-grad" x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E5FF"/>
          <stop offset="1" stopColor="#33EAFF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
