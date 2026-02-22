import React from "react";
import { Droplets, Pencil, Trash2, Coins } from "lucide-react";
import { Potion } from "../types";

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

  return (
    <div className="group relative bg-black/40 p-4 rounded-xl border border-white/5 hover:border-wizard-accent transition-all hover:bg-black/60">
      <div className="flex gap-4">
        <div
          className="w-14 h-18 rounded-lg p-1 relative potion-float shadow-lg shadow-black/40"
          style={{
            background: `linear-gradient(to bottom, ${c1}, ${c2})`,
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-2 bg-amber-800 rounded-sm"></div>
          <div className="w-full h-full border-2 border-white/20 rounded-lg flex items-center justify-center">
            <Droplets className="w-5 h-5 text-white/40" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-wizard-gold text-sm">
              {potion.name}
            </h3>
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
          <p className="text-xs text-white/60 mb-2 line-clamp-2">
            {potion.effect}
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
