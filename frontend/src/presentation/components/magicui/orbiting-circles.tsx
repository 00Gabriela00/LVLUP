import { cn } from '../../../lib/utils';
import React from 'react';

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  pathStroke?: string;
  pathGlowColor?: string;
  pathDashArray?: string;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
  pathStroke = 'rgba(0, 229, 255, 0.35)',
  pathGlowColor = 'rgba(0, 229, 255, 0.45)',
  pathDashArray = '4 6',
  iconSize = 36,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full z-[1]"
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={pathStroke}
            strokeWidth="1.5"
            strokeDasharray={pathDashArray}
            style={{
              filter: `drop-shadow(0 0 8px ${pathGlowColor})`,
            }}
          />
        </svg>
      )}

      {/* Orbit tracker (does the 360 rotation without hover transform collision) */}
      <div
        style={
          {
            '--duration': calculatedDuration,
            '--radius': radius,
            '--delay': -delay,
            '--icon-size': `${iconSize}px`,
          } as React.CSSProperties
        }
        className={cn(
          'absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center pointer-events-none z-10 [animation-delay:calc(var(--delay)*1s)]',
          { '[animation-direction:reverse]': reverse },
          className
        )}
        {...props}
      >
        {/* Child capsule: Handles pointer events and smooth scale on hover without breaking orbit */}
        <div className="pointer-events-auto transition-transform duration-300 hover:scale-135 hover:z-30 cursor-pointer flex items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
}
