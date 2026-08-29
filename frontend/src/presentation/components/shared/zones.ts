import { Gamepad2, CircleDot, Mic2 } from 'lucide-react';

export const C = {
  pink: 'text-brand-pink',
  pinkDim: 'bg-brand-pink/20',
  cyan: 'text-brand-cyan',
  cyanDim: 'bg-brand-cyan/20',
  purple: 'text-brand-purple',
  purpleDim: 'bg-brand-purple/20',
} as const;

export const zones = [
  { key: 'arcade', label: 'Arcade', color: C.cyan, dim: C.cyanDim, icon: Gamepad2, border: 'border-brand-cyan' },
  { key: 'bowling', label: 'Bowling & Pool', color: C.purple, dim: C.purpleDim, icon: CircleDot, border: 'border-brand-purple' },
  { key: 'karaoke', label: 'Karaoke', color: C.pink, dim: C.pinkDim, icon: Mic2, border: 'border-brand-pink' },
] as const;
