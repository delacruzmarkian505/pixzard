import React from "react";
import {
  Beaker,
  Sparkles,
  Info,
  Flame,
  Droplets,
  Zap,
  Skull,
} from "lucide-react";
import { Ingredient, Player } from "../types";

export const INGREDIENTS: Ingredient[] = [
  {
    id: "i1",
    name: "Dragon Scale",
    icon: <Flame className="w-5 h-5" />,
    color: "text-red-500",
    description:
      "Hardened scales that retain extreme heat. Used for fire-based and defensive brews.",
  },
  {
    id: "i2",
    name: "Moon Leaf",
    icon: <Droplets className="w-5 h-5" />,
    color: "text-blue-300",
    description:
      "Leaves that glow under starlight. Essential for healing and purification potions.",
  },
  {
    id: "i3",
    name: "Storm Core",
    icon: <Zap className="w-5 h-5" />,
    color: "text-yellow-400",
    description:
      "Crackling energy from the heart of a tempest. Adds electrical potency to mixtures.",
  },
  {
    id: "i4",
    name: "Nightshade",
    icon: <Skull className="w-5 h-5" />,
    color: "text-purple-500",
    description:
      "A toxic plant that blooms in total darkness. Primary ingredient for offensive toxins.",
  },
  {
    id: "i5",
    name: "Phoenix Feather",
    icon: <Zap className="w-5 h-5 text-orange-500" />,
    color: "text-orange-500",
    description:
      "A feather that never turns to ash. Grants powerful regenerative properties.",
  },
  {
    id: "i6",
    name: "Ghost Mist",
    icon: <Sparkles className="w-5 h-5 text-slate-300" />,
    color: "text-slate-300",
    description:
      "Ethereal vapor from the spirit realm. Useful for spectral and illusionary effects.",
  },
];

interface BrewingStationProps {
  player: Player;
  selectedIngredients: Ingredient[];
  isBrewing: boolean;
  onToggleIngredient: (ing: Ingredient) => void;
  onBrew: () => void;
}

export const BrewingStation: React.FC<BrewingStationProps> = ({
  player,
  selectedIngredients,
  isBrewing,
  onToggleIngredient,
  onBrew,
}) => {
  const getStock = (name: string) => {
    switch (name) {
      case "Dragon Scale":
        return player.dragonScales;
      case "Moon Leaf":
        return player.moonLeaves;
      case "Storm Core":
        return player.stormCores;
      case "Nightshade":
        return player.nightshade;
      case "Phoenix Feather":
        return player.phoenixFeathers;
      case "Ghost Mist":
        return player.ghostMist;
      default:
        return 0;
    }
  };
  return (
    <section className="lg:col-span-4 flex flex-col gap-6">
      <div className="glass-card p-6 rounded-2xl pixel-border flex flex-col gap-6">
        <h2 className="pixel-text text-sm text-wizard-pink flex items-center gap-2">
          <Beaker className="w-4 h-4" /> Brewing Station
        </h2>

        <div className="relative h-44 bg-black/40 rounded-xl flex items-center justify-center border-2 border-dashed border-wizard-accent/30 overflow-hidden">
          <div
            className={`transition-all duration-700 ${isBrewing ? "scale-150 rotate-180 opacity-0" : "scale-100 opacity-100"}`}
          >
            <div className="flex gap-4">
              {selectedIngredients.length === 0 ? (
                <p className="text-xs text-center opacity-40 px-8">
                  Select 2-3 ingredients to start brewing
                </p>
              ) : (
                selectedIngredients.map((ing) => (
                  <div
                    key={ing.id}
                    className="p-4 bg-wizard-purple rounded-xl pixel-border animate-bounce"
                  >
                    {ing.icon}
                  </div>
                ))
              )}
            </div>
          </div>

          {isBrewing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-wizard-accent/20 animate-pulse">
              <Sparkles className="w-10 h-10 text-wizard-gold animate-spin" />
              <p className="pixel-text text-[10px] mt-4">Brewing...</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {INGREDIENTS.map((ing) => {
            const stock = getStock(ing.name);
            const isSelected = selectedIngredients.find((i) => i.id === ing.id);
            return (
              <button
                key={ing.id}
                onClick={() => onToggleIngredient(ing)}
                disabled={stock === 0 && !isSelected}
                className={`group flex flex-col items-center gap-2 p-3 rounded-xl border transition-all relative overflow-hidden ${
                  isSelected
                    ? "bg-wizard-accent border-wizard-gold shadow-lg shadow-wizard-accent/50"
                    : stock === 0
                      ? "bg-black/10 border-white/5 opacity-40 cursor-not-allowed"
                      : "bg-black/20 border-white/10 hover:border-wizard-accent hover:bg-black/40"
                }`}
              >
                {/* Hover Description Overlay */}
                <div className="absolute inset-0 bg-wizard-indigo/95 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <p className="text-[8px] text-center leading-tight italic text-wizard-gold px-1">
                    {ing.description}
                  </p>
                </div>

                <div className={`${ing.color}`}>{ing.icon}</div>
                <span className="text-[10px] font-medium">{ing.name}</span>
                <span className="absolute -top-1 -right-1 bg-wizard-purple border border-white/20 text-[8px] px-1.5 rounded-full font-bold z-20">
                  {stock}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onBrew}
          disabled={selectedIngredients.length < 2 || isBrewing}
          className={`w-full py-4 pixel-text text-[10px] premium-btn transition-all ${
            selectedIngredients.length < 2 || isBrewing
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-linear-to-r from-wizard-accent to-wizard-pink shadow-xl"
          }`}
        >
          BREW POTION
        </button>
      </div>

      <div className="glass-card p-6 rounded-2xl hidden lg:block opacity-60">
        <h3 className="text-xs font-bold mb-2 flex items-center gap-2">
          <Info className="w-4 h-4" /> Lab Notes
        </h3>
        <p className="text-[10px] leading-relaxed">
          Running low on essence? Venture into the{" "}
          <span className="text-emerald-400 font-bold">Enchanted Forest</span>{" "}
          to gather more ingredients. Mixing 3 items creates legendary brews!
        </p>
      </div>
    </section>
  );
};
