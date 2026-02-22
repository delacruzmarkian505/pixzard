import React from "react";
import { Book, Skull } from "lucide-react";
import { Potion } from "../types";
import { PotionCard } from "./PotionCard";

interface GrimoireProps {
  potions: Potion[];
  onEdit: (potion: Potion) => void;
  onDelete: (id: number) => void;
  onSell: (potion: Potion) => void;
}

export const Grimoire: React.FC<GrimoireProps> = ({
  potions,
  onEdit,
  onDelete,
  onSell,
}) => {
  return (
    <section className="lg:col-span-8">
      <div className="glass-card p-6 rounded-2xl pixel-border min-h-[550px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="pixel-text text-sm text-wizard-gold flex items-center gap-2">
            <Book className="w-4 h-4" /> Your Grimoire
          </h2>
          <span className="text-[10px] opacity-50 uppercase tracking-widest">
            {potions.length} Potions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {potions.map((potion) => (
            <PotionCard
              key={potion.id}
              potion={potion}
              onEdit={onEdit}
              onDelete={onDelete}
              onSell={onSell}
            />
          ))}

          {potions.length === 0 && (
            <div className="col-span-2 py-16 flex flex-col items-center justify-center opacity-20">
              <Skull className="w-10 h-10 mb-4" />
              <p className="pixel-text text-[10px]">
                Your grimoire is empty...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
