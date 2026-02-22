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

  const getEnhancedEffect = (name: string, effect: string) => {
    if (!effect.startsWith("Combined power of")) return effect;

    // Mapping of names to descriptions for legacy potions
    const mappings: Record<string, string> = {
      "Eternal Sunfire":
        "A radiant brew that glows with the heat of a thousand suns. Heals wounds and clears the path with blinding light.",
      "Dragon's Rebirth":
        "Infused with the essence of fire and myth. Restores life force and grants the resilience of a dragon.",
      "Void Whisper":
        "A dark, swirling liquid that seems to absorb light. Inflicts devastating soul damage on those who oppose you.",
      "Spectral Toxin":
        "A ghostly green mist trapped in a vial. Weakens the spirit and slowly drains the life of your enemies.",
      "Lunar Mirage":
        "A shimmering potion that reflects the silver light of the moon. Grants exceptional clarity and wards off illusions.",
      "Thunder Drake Essence":
        "A crackling elixir that channels the fury of a storm. Strikes enemies with lightning and grants a boost in speed.",
      "Grand Alchemist's Elixir":
        "The pinnacle of alchemical science. A perfectly balanced draft that empowers every fiber of your being.",
    };

    if (mappings[name]) return mappings[name];

    // Generic categorization based on name prefixes for legacy random potions
    if (name.includes("Radiant"))
      return "A bright mixture that purifies the soul and restores vitality.";
    if (name.includes("Shadowed"))
      return "A murky brew that hides the user in darkness, granting a tactical advantage.";
    if (name.includes("Unstable"))
      return "A bubbling solution that reacts violently. Potent but unpredictable.";
    if (name.includes("Purified"))
      return "A crystal-clear liquid that removes all impurities and strengthens the mind.";
    if (name.includes("Misty"))
      return "A vaporous concoction that allows for swift movement.";
    if (name.includes("Fiery"))
      return "A burning liquid that ignites the spirit and enhances combat prowess.";
    if (name.includes("Arcane"))
      return "A pulsing purple elixir that connects the user to raw magical currents.";

    return "A mysterious bubbling concoction with unknown magical properties.";
  };

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
            <div className="flex items-center gap-2">
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
          <p className="text-[10px] text-white/60 mb-2 leading-relaxed italic">
            {getEnhancedEffect(potion.name, potion.effect)}
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
