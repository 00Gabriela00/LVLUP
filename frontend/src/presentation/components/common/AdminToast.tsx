import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Trash2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastData {
  id: string;
  type: 'success' | 'delete' | 'warning' | 'info';
  title: string;
  description: string;
  duration?: number;
}

interface AdminToastProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export function AdminToastContainer({ toasts, onDismiss }: AdminToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  const { id, type, title, description, duration = 4000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  const getStyle = () => {
    switch (type) {
      case 'delete':
        return {
          icon: Trash2,
          iconBg: 'bg-red-500/10 text-red-600 border border-red-500/20',
          border: 'border-red-200/80',
          barColor: 'bg-red-500',
        };
      case 'success':
        return {
          icon: CheckCircle2,
          iconBg: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
          border: 'border-emerald-200/80',
          barColor: 'bg-emerald-500',
        };
      case 'warning':
        return {
          icon: AlertCircle,
          iconBg: 'bg-amber-500/10 text-amber-600 border border-amber-500/20',
          border: 'border-amber-200/80',
          barColor: 'bg-amber-500',
        };
      default:
        return {
          icon: Info,
          iconBg: 'bg-slate-500/10 text-slate-700 border border-slate-500/20',
          border: 'border-slate-200/80',
          barColor: 'bg-slate-700',
        };
    }
  };

  const style = getStyle();
  const IconComponent = style.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
      className={`pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border ${style.border} relative overflow-hidden flex items-start gap-3`}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${style.iconBg}`}>
        <IconComponent size={18} />
      </div>

      <div className="flex-1 min-w-0 pr-2">
        <h4 className="text-xs font-bold text-slate-900 leading-tight">{title}</h4>
        <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{description}</p>
      </div>

      <button
        onClick={() => onDismiss(id)}
        className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
      >
        <X size={14} />
      </button>

      {/* Subtle Progress Bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
        className={`absolute bottom-0 left-0 h-0.5 ${style.barColor} opacity-70`}
      />
    </motion.div>
  );
}
