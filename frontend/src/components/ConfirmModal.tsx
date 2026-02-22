import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "danger" | "warning" | "info";
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  type = "info",
}) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md glass-card p-8 rounded-3xl border-2 border-white/10 shadow-2xl animate-in zoom-in duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-2xl ${
                type === "danger"
                  ? "bg-red-500/20 text-red-500"
                  : type === "warning"
                    ? "bg-amber-500/20 text-amber-500"
                    : "bg-wizard-accent/20 text-wizard-accent"
              }`}
            >
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="pixel-text text-xl text-white">{title}</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                Wizard confirmation required
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 opacity-40" />
          </button>
        </div>

        <p className="text-white/70 mb-8 leading-relaxed">{message}</p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-4 px-6 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all border border-white/5 text-sm"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 text-sm shadow-lg ${
              type === "danger"
                ? "bg-red-600 hover:bg-red-500 shadow-red-900/20"
                : type === "warning"
                  ? "bg-amber-600 hover:bg-amber-500 shadow-amber-900/20"
                  : "bg-wizard-accent hover:opacity-90 shadow-wizard-accent/20"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
