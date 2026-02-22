import React from "react";
import { Header } from "../components/Header";
import { BrewingStation } from "../components/BrewingStation";
import { Grimoire } from "../components/Grimoire";
import { EditPotionModal } from "../components/EditPotionModal";
import { Player, Potion, Ingredient } from "../types";

interface LaboratoryPageProps {
  player: Player;
  potions: Potion[];
  selectedIngredients: Ingredient[];
  isBrewing: boolean;
  editingPotion: Potion | null;
  onLogout: () => void;
  onToggleIngredient: (ing: Ingredient) => void;
  onBrew: () => void;
  onDeletePotion: (id: number) => void;
  onStartEdit: (potion: Potion) => void;
  onCancelEdit: () => void;
  onUpdatePotion: (e: React.FormEvent) => void;
  onEditPotionChange: (potion: Potion) => void;
  onGoToForest: () => void;
  onSellPotion: (potion: Potion) => void;
  onOpenShop: () => void;
  onGoToLair: () => void;
}

export const LaboratoryPage: React.FC<LaboratoryPageProps> = ({
  player,
  potions,
  selectedIngredients,
  isBrewing,
  editingPotion,
  onLogout,
  onToggleIngredient,
  onBrew,
  onDeletePotion,
  onStartEdit,
  onCancelEdit,
  onUpdatePotion,
  onEditPotionChange,
  onGoToForest,
  onSellPotion,
  onOpenShop,
  onGoToLair,
}) => {
  return (
    <div
      className="min-h-screen w-full bg-wizard-indigo text-white flex flex-col items-center p-4 lg:p-8 relative overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(26, 16, 51, 0.85), rgba(26, 16, 51, 0.95)), url("/pixzard_lab_bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Decorative Particles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-wizard-purple/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-wizard-pink/10 blur-[120px] rounded-full -z-10 animate-pulse delay-1000"></div>

      <Header
        player={player}
        onLogout={onLogout}
        onGoToForest={onGoToForest}
        onOpenShop={onOpenShop}
        onGoToLair={onGoToLair}
      />

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        <BrewingStation
          player={player}
          selectedIngredients={selectedIngredients}
          isBrewing={isBrewing}
          onToggleIngredient={onToggleIngredient}
          onBrew={onBrew}
        />

        <Grimoire
          potions={potions}
          onEdit={onStartEdit}
          onDelete={onDeletePotion}
          onSell={onSellPotion}
        />
      </main>

      {editingPotion && (
        <EditPotionModal
          potion={editingPotion}
          onClose={onCancelEdit}
          onUpdate={onUpdatePotion}
          onChange={onEditPotionChange}
        />
      )}

      <footer className="mt-8 opacity-20 text-[8px] pixel-text">
        &copy; 2026 PIXZARD LABS • BUILT WITH NESTJS + TS
      </footer>
    </div>
  );
};
