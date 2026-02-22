import React from "react";
import { LogOut, Coins, Sparkles, Trees, Sword } from "lucide-react";
import { Player } from "../types";

interface HeaderProps {
  player: Player;
  onLogout: () => void;
  onGoToForest: () => void;
  onOpenShop: () => void;
  onGoToLair: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  player,
  onLogout,
  onGoToForest,
  onOpenShop,
  onGoToLair,
}) => {
  return (
    <header className="w-full max-w-6xl flex justify-between items-center mb-8 glass-card p-6 rounded-2xl pixel-border">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 group">
          <div className="p-2 bg-wizard-accent/20 rounded-xl glow-purple border border-wizard-accent/30 group-hover:scale-110 transition-transform">
            <img
              src="/pixzard_logo.png"
              alt="Logo"
              className="w-8 h-8 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <h1 className="pixel-text text-xl tracking-tighter bg-linear-to-r from-wizard-gold via-white to-wizard-pink bg-clip-text text-transparent drop-shadow-sm">
            PIXZARD
          </h1>
        </div>
        <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div>
            <h1 className="pixel-text text-lg text-wizard-gold">
              {player.name}
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onGoToForest}
              className="flex items-center gap-2 px-3 py-1 bg-wizard-purple/40 hover:bg-wizard-purple border border-white/10 rounded-lg transition-all hover:scale-105"
            >
              <Trees className="w-3 h-3 text-emerald-400" />
              <span className="text-[8px] pixel-text text-emerald-400">
                Forest
              </span>
            </button>
            <button
              onClick={onOpenShop}
              className="flex items-center gap-2 px-3 py-1 bg-wizard-gold/20 hover:bg-wizard-gold/40 border border-wizard-gold/20 rounded-lg transition-all hover:scale-105"
            >
              <Coins className="w-3 h-3 text-wizard-gold" />
              <span className="text-[8px] pixel-text text-wizard-gold">
                Shop
              </span>
            </button>
            <button
              onClick={onGoToLair}
              className="flex items-center gap-2 px-3 py-1 bg-red-900/40 hover:bg-red-900/60 border border-red-500/30 rounded-lg transition-all hover:scale-105"
            >
              <Sword className="w-3 h-3 text-red-500" />
              <span className="text-[8px] pixel-text text-red-500">Lair</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-wizard-gold/30">
          <Coins className="w-4 h-4 text-wizard-gold" />
          <span className="font-bold text-wizard-gold text-sm">
            {player.coins}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-wizard-pink/30">
          <Sparkles className="w-4 h-4 text-wizard-pink" />
          <span className="font-bold text-wizard-pink text-sm">
            {player.xp} XP
          </span>
        </div>
        <button
          onClick={onLogout}
          className="p-2 hover:text-red-400 transition-colors bg-white/5 rounded-lg"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
