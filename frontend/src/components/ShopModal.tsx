import React from "react";
import { Store, X, Coins } from "lucide-react";
import { Player } from "../types";
import { INGREDIENTS } from "./BrewingStation";

interface ShopModalProps {
  player: Player;
  onClose: () => void;
  onPurchase: (materialKey: keyof Player, price: number) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  player,
  onClose,
  onPurchase,
}) => {
  const shopItems = [
    {
      ...INGREDIENTS[0],
      price: 150,
      materialKey: "dragonScales" as keyof Player,
    },
    {
      ...INGREDIENTS[1],
      price: 100,
      materialKey: "moonLeaves" as keyof Player,
    },
    {
      ...INGREDIENTS[2],
      price: 120,
      materialKey: "stormCores" as keyof Player,
    },
    {
      ...INGREDIENTS[3],
      price: 180,
      materialKey: "nightshade" as keyof Player,
    },
    {
      ...INGREDIENTS[4],
      price: 250,
      materialKey: "phoenixFeathers" as keyof Player,
    },
    { ...INGREDIENTS[5], price: 300, materialKey: "ghostMist" as keyof Player },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <div className="relative glass-card rounded-3xl pixel-border p-8 border-white/10 shadow-2xl overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-wizard-gold/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative flex justify-between items-start mb-8">
            <div>
              <h2 className="pixel-text text-2xl text-wizard-gold flex items-center gap-3">
                <Store className="w-8 h-8" /> Alchemist's Emporium
              </h2>
              <p className="text-[10px] opacity-60 mt-1 uppercase tracking-widest">
                Premium ingredients for the master wizard
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-wizard-gold/10 px-4 py-2 rounded-2xl border border-wizard-gold/20 flex items-center gap-3">
                <Coins className="w-5 h-5 text-wizard-gold" />
                <span className="pixel-text text-lg text-white">
                  {player.coins}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-red-500/20 rounded-xl transition-colors border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-black/40 p-6 rounded-2xl border border-white/5 hover:border-wizard-gold/50 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`p-4 rounded-xl bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <p className="text-[10px] opacity-40 uppercase">
                      Stock: {player[item.materialKey] as number}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-wizard-gold">
                    <Coins className="w-4 h-4" />
                    <span className="pixel-text text-sm">{item.price}</span>
                  </div>

                  <button
                    disabled={player.coins < item.price}
                    onClick={() => onPurchase(item.materialKey, item.price)}
                    className="py-2 px-4 rounded-xl bg-wizard-gold text-black font-bold text-xs hover:bg-yellow-400 disabled:opacity-20 disabled:grayscale transition-all transform active:scale-95"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-4 bg-wizard-gold/5 border border-wizard-gold/10 rounded-2xl text-center">
            <p className="text-[10px] text-wizard-gold uppercase tracking-[0.2em]">
              "Only the finest reagents for the truly ambitious alchemist."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
