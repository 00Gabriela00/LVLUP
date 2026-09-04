import { useEffect, useRef } from 'react';

interface StarfieldBackgroundProps {
  className?: string;
}

export function StarfieldBackground({ className = '' }: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isTabActive = true;

    // Fixed canvas size tied strictly to viewport resolution (never document scroll height)
    // to prevent GPU memory bloat and frame drops.
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2 for performance
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    // 140 stars with randomized initial positions and speeds
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * viewportW,
      y: Math.random() * viewportH,
      r: Math.random() * 1.3 + 0.2,
      s: Math.random() * 0.4 + 0.1,
      o: Math.random(),
    }));

    const draw = () => {
      if (!isTabActive) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const st = stars[i];
        st.o += (Math.random() - 0.5) * 0.02;
        st.o = Math.max(0.1, Math.min(1, st.o));

        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${st.o})`;
        ctx.fill();

        st.y += st.s * 0.15;
        if (st.y > h) {
          st.y = 0;
          st.x = Math.random() * w;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Pause animation when tab is inactive to save battery and CPU cycles
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isTabActive = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isTabActive) {
          isTabActive = true;
          draw();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="stars"
      className={`pointer-events-none fixed inset-0 z-0 h-screen w-screen transform-gpu ${className}`}
      aria-hidden="true"
    />
  );
}
