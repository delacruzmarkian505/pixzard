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
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [isTooltipBelow, setIsTooltipBelow] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const [c1, c2] = (potion.color || "").includes(",")
    ? (potion.color || "").split(",")
    : ["#10b981", "#0d9488"];

  const stats = getPotionStats(potion);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      // If there's less than 280px space above the card, show it below
      setIsTooltipBelow(rect.top < 280);
    }
    setShowTooltip(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
      className={`group relative bg-black/40 p-4 rounded-xl border border-white/5 hover:border-wizard-accent/50 transition-all duration-300 hover:bg-black/60 transform hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)] ${
        showTooltip ? "z-50" : "z-0"
      }`}
    >
      {/* Premium Floating Info Card (Viewport Aware) */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-64 p-5 bg-wizard-indigo backdrop-blur-xl rounded-2xl border-2 border-wizard-accent/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] transition-all duration-300 z-50 flex flex-col items-center gap-4 pointer-events-none ${
          showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } ${isTooltipBelow ? "top-full mt-4" : "bottom-full mb-4"}`}
      >
        {/* Triangle Pointer */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 border-8 border-transparent ${
            isTooltipBelow
              ? "bottom-full border-b-wizard-indigo"
              : "top-full border-t-wizard-indigo"
          }`}
        ></div>

        <div className="flex flex-col items-center gap-1">
          <h4 className="pixel-text text-[10px] text-wizard-gold uppercase tracking-widest">
            Arcane Properties
          </h4>
          <div className="h-px w-full bg-linear-to-r from-transparent via-wizard-gold/30 to-transparent"></div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 mb-2 shadow-inner">
              <Sword className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-lg font-bold text-red-400 leading-none">
              {stats.damage}
            </span>
            <span className="text-[9px] opacity-40 uppercase tracking-tighter">
              Damage
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mb-2 shadow-inner">
              <Heart className="w-6 h-6 text-emerald-500" />
            </div>
            <span className="font-bold text-emerald-400">{stats.heal}</span>
            <span className="text-[8px] opacity-40 uppercase">Heal</span>
          </div>
        </div>

        <div className="bg-black/40 p-3 rounded-xl border border-white/5 w-full">
          <p className="text-[11px] text-white/80 italic text-center leading-relaxed">
            "{getEnhancedDescription(potion.name, potion.effect)}"
          </p>
        </div>
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
