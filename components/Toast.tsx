import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'processing';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setIsVisible(true));

    // Auto dismiss for success and error
    if (toast.type !== 'processing') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Wait for exit animation to finish before removing from DOM
        setTimeout(() => onClose(toast.id), 300); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.type, toast.id, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(toast.id), 300);
  };

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-pump-green" />,
          titleColor: 'text-pump-green',
          borderColor: 'border-pump-green'
        };
      case 'error':
        return {
          icon: <XCircle className="w-6 h-6 text-pump-red" />,
          titleColor: 'text-pump-red',
          borderColor: 'border-pump-red'
        };
      case 'processing':
        return {
          icon: <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />,
          titleColor: 'text-blue-400',
          borderColor: 'border-blue-400'
        };
    }
  };

  const styles = getStyles();

  return (
    <div 
      className={`
        pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-[#0d1117] border border-gray-800 shadow-xl 
        transition-all duration-300 transform mb-3
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
    >
      <div className="p-4 flex items-start gap-3">
        <div className="shrink-0 pt-0.5">
          {styles.icon}
        </div>
        <div className="flex-1 w-0">
          <p className={`text-xs font-black uppercase tracking-wider ${styles.titleColor}`}>
            {toast.title}
          </p>
          <p className="mt-1 text-sm text-gray-300 leading-snug">
            {toast.message}
          </p>
        </div>
        <div className="shrink-0 flex text-gray-400 hover:text-white cursor-pointer" onClick={handleClose}>
          <X className="w-4 h-4" />
        </div>
      </div>
      {/* Progress bar for auto-dismiss items */}
      {toast.type !== 'processing' && isVisible && (
        <div className="h-0.5 w-full bg-gray-800">
           <div 
             className={`h-full ${toast.type === 'success' ? 'bg-pump-green' : 'bg-pump-red'} transition-all ease-linear duration-[3000ms] w-0`} 
             style={{ width: '100%', transitionDuration: '3000ms' }}
             ref={(el) => {
                 // Simple hack to trigger the width animation after mount
                 if (el) requestAnimationFrame(() => el.style.width = '0%');
             }}
           />
        </div>
      )}
    </div>
  );
};

export default Toast;