import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass-card p-8 rounded-3xl pixel-border max-w-md w-full relative overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Decorative background element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-wizard-pink/20 rounded-full blur-3xl" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-red-500/20 rounded-2xl mb-6 glow-red">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>

          <h3 className="pixel-text text-lg text-red-500 mb-4 tracking-tighter uppercase">
            Magical Interruption
          </h3>

          <div className="bg-black/30 p-4 rounded-xl border border-white/5 w-full mb-8">
            <p className="text-sm font-medium text-white/80 leading-relaxed">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 pixel-text text-xs bg-linear-to-r from-red-600 to-wizard-pink premium-btn shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform"
          >
            I UNDERSTAND
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
