import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAlert } from '../context/AlertContext';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const CustomAlert = () => {
  const { isOpen, message, type, isConfirm, closeAlert } = useAlert();

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={32} className="text-neo-success" />;
      case 'error': return <XCircle size={32} className="text-red-500" />;
      case 'warning': return <AlertTriangle size={32} className="text-yellow-500" />;
      default: return <Info size={32} className="text-neo-accent" />;
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success': return 'border-neo-success/30';
      case 'error': return 'border-red-500/30';
      case 'warning': return 'border-yellow-500/30';
      default: return 'border-neo-accent/30';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isConfirm && closeAlert()}
            className="fixed inset-0 z-[9998] bg-[#E0E5EC]/60 backdrop-blur-md"
          />

          {/* Alert Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`pointer-events-auto w-full max-w-sm bg-neo-bg rounded-[32px] shadow-extruded p-8 border-2 ${getTypeStyles()} relative overflow-hidden`}
            >
              {/* Subtle background glow based on type */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 ${
                type === 'success' ? 'bg-neo-success' : 
                type === 'error' ? 'bg-red-500' : 
                type === 'warning' ? 'bg-yellow-500' : 'bg-neo-accent'
              }`} />

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="mb-6 p-4 rounded-full bg-neo-bg shadow-inset-small">
                  {getIcon()}
                </div>
                
                <h3 className="text-xl font-bold font-display text-neo-fg mb-3 capitalize">
                  {isConfirm ? 'Confirm Action' : type}
                </h3>
                
                <p className="text-neo-muted font-medium mb-8 leading-relaxed">
                  {message}
                </p>

                <div className="flex gap-4 w-full">
                  {isConfirm ? (
                    <>
                      <button
                        onClick={() => closeAlert(false)}
                        className="flex-1 py-4 bg-neo-bg text-neo-fg font-bold rounded-2xl shadow-extruded hover:-translate-y-[1px] hover:shadow-extruded-hover active:translate-y-[0.5px] active:shadow-inset transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => closeAlert(true)}
                        className="flex-1 py-4 bg-neo-accent text-white font-bold rounded-2xl shadow-extruded hover:-translate-y-[1px] hover:shadow-extruded-hover active:translate-y-[0.5px] active:shadow-inset transition-all"
                      >
                        Confirm
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => closeAlert()}
                      className="w-full py-4 bg-neo-accent text-white font-bold rounded-2xl shadow-extruded hover:-translate-y-[1px] hover:shadow-extruded-hover active:translate-y-[0.5px] active:shadow-inset transition-all"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;
