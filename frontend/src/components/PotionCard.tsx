import React from "react";
import { Droplets, Pencil, Trash2, Coins, Sword, Heart } from "lucide-react";
import { Potion } from "../types";
import { getPotionStats, getEnhancedDescription } from "../potionUtils";

interface PotionCardProps {
  potion: Potion;
  onEdit: (potion: Potion) => void;
  onDelete: (id: number) => void;
  onSell: (potion: Potion) => void;
}

export const PotionCard: React.FC<PotionCardProps> = ({
  potion,
  onEdit,
  onDelete,
  onSell,
}) => {
  const [c1, c2] = (potion.color || "").includes(",")
    ? (potion.color || "").split(",")
    : ["#10b981", "#0d9488"];

  const stats = getPotionStats(potion);

  return (
    <div className="group relative bg-black/40 p-4 rounded-xl border border-white/5 hover:border-wizard-accent/50 transition-all duration-300 hover:bg-black/60 overflow-hidden transform hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)]">
      {/* Hover Stats Overlay */}
      <div className="absolute inset-0 bg-wizard-indigo/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 p-4">
        <h4 className="pixel-text text-[10px] text-wizard-gold mb-1">
          Combat Potency
        </h4>
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 mb-1">
              <Sword className="w-5 h-5 text-red-500" />
            </div>
            <span className="font-bold text-red-400">{stats.damage}</span>
            <span className="text-[8px] opacity-40 uppercase">Damage</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mb-1">
              <Heart className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="font-bold text-emerald-400">{stats.heal}</span>
            <span className="text-[8px] opacity-40 uppercase">Heal</span>
          </div>
        </div>
        <p className="text-[9px] text-white/40 italic text-center mt-2 line-clamp-2">
          "{getEnhancedDescription(potion.name, potion.effect)}"
        </p>
      </div>

      <div className="flex gap-4">
        <div
          className="w-14 h-18 rounded-lg p-1 relative potion-float shadow-lg shadow-black/40 shrink-0"
          style={{
            background: `linear-gradient(to bottom, ${c1}, ${c2})`,
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-2 bg-amber-800 rounded-sm"></div>
          <div className="w-full h-full border-2 border-white/20 rounded-lg flex items-center justify-center">
            <Droplets className="w-5 h-5 text-white/40" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1 overflow-hidden">
            <h3 className="font-bold text-wizard-gold text-sm truncate pr-2">
              {potion.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <span
                className={`text-[8px] px-1.5 py-0.5 rounded border border-white/20 uppercase font-bold ${
                  potion.rarity === "Legendary"
                    ? "bg-amber-500 text-black animate-pulse"
                    : potion.rarity === "Rare"
                      ? "bg-purple-900 text-purple-200"
                      : "bg-white/10"
                }`}
              >
                {potion.rarity}
              </span>
              <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full font-mono text-wizard-gold">
                x{potion.quantity || 1}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-white/60 mb-3 leading-relaxed italic line-clamp-2 min-h-[30px]">
            {getEnhancedDescription(potion.name, potion.effect)}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(potion)}
              title="Refine Name & Effect"
              className="p-1.5 bg-white/5 hover:bg-wizard-accent/30 rounded-lg transition-colors border border-white/5"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSell(potion)}
              title={`Sell for ${Math.floor(potion.price * 0.8)} coins`}
              className="p-1.5 bg-wizard-gold/10 hover:bg-wizard-gold/30 text-wizard-gold rounded-lg transition-colors border border-wizard-gold/20"
            >
              <Coins className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(potion.id)}
              title="Discard Essence"
              className="p-1.5 bg-red-500/5 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors ml-auto border border-red-500/10"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
