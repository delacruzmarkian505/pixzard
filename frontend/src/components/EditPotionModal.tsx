import React from "react";
import { Potion } from "../types";

interface EditPotionModalProps {
  potion: Potion;
  onClose: () => void;
  onUpdate: (e: React.FormEvent) => void;
  onChange: (potion: Potion) => void;
}

export const EditPotionModal: React.FC<EditPotionModalProps> = ({
  potion,
  onClose,
  onUpdate,
  onChange,
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card p-8 rounded-2xl pixel-border max-w-md w-full animate-in fade-in zoom-in duration-300">
        <h2 className="pixel-text text-sm mb-6 text-wizard-gold">
          Refine Potion
        </h2>
        <form onSubmit={onUpdate} className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] uppercase opacity-60 mb-2 block">
              Potion Name
            </label>
            <input
              type="text"
              value={potion.name}
              onChange={(e) => onChange({ ...potion, name: e.target.value })}
              className="w-full bg-black/40 border-2 border-wizard-accent/30 p-3 rounded-xl focus:border-wizard-pink outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase opacity-60 mb-2 block">
              Description
            </label>
            <textarea
              value={potion.effect}
              onChange={(e) => onChange({ ...potion, effect: e.target.value })}
              className="w-full bg-black/40 border-2 border-wizard-accent/30 p-3 rounded-xl focus:border-wizard-pink outline-none h-24 transition-all"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-wizard-accent premium-btn hover:bg-wizard-pink font-bold text-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
