import React from "react";
import { X, Sword, Shield, Trophy, Zap } from "lucide-react";
import { Boss } from "../types";

const BOSSES: Boss[] = [
  {
    name: "Grom the Orc Warchief",
    maxHp: 800,
    attack: 40,
    image: "/retro_orc_boss.png",
    background: "/battle_bg_orc.png",
    reward: { coins: 500, xp: 200 },
  },
  {
    name: "Shadow Specter",
    maxHp: 1500,
    attack: 60,
    image: "/retro_shadow_specter.png",
    background: "/battle_bg_specter.png",
    reward: { coins: 1200, xp: 450 },
  },
  {
    name: "Ancient Emerald Drake",
    maxHp: 5000,
    attack: 75,
    image: "/retro_dragon.png",
    background: "/battle_arena_ruins.png",
    reward: { coins: 5000, xp: 2000 },
  },
];

interface BossSelectionModalProps {
  onSelect: (boss: Boss) => void;
  onClose: () => void;
}

export const BossSelectionModal: React.FC<BossSelectionModalProps> = ({
  onSelect,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-5xl glass-card rounded-[40px] border-white/10 p-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-wizard-accent/20 blur-[120px] -z-10 rounded-full"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-12">
          <h2 className="pixel-text text-3xl text-wizard-gold mb-4 tracking-widest">
            SELECT YOUR ADVERSARY
          </h2>
          <p className="text-white/40 uppercase tracking-[0.3em] text-xs">
            Choose a lair to raid. Greater danger yields greater spoils.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BOSSES.map((boss) => (
            <button
              key={boss.name}
              onClick={() => onSelect(boss)}
              className="group relative flex flex-col items-center p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-wizard-accent transition-all duration-500 hover:bg-wizard-accent/5 hover:-translate-y-2"
            >
              {/* Boss Image Container */}
              <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-wizard-indigo/20 blur-2xl group-hover:bg-wizard-accent/30 transition-colors rounded-full animate-pulse"></div>
                <img
                  src={boss.image}
                  alt={boss.name}
                  className={`w-40 h-40 object-contain filter drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500 ${boss.name === "Ancient Emerald Drake" ? "" : "scale-x-[-1]"}`}
                  style={{ imageRendering: "pixelated" }}
                />
              </div>

              <h3 className="pixel-text text-sm text-wizard-gold mb-6 group-hover:scale-105 transition-transform">
                {boss.name}
              </h3>

              <div className="w-full space-y-3 mb-8">
                {/* Stats Row */}
                <div className="flex justify-between items-center px-4 py-2 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] text-white/60 uppercase">
                      Vitality
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {boss.maxHp} HP
                  </span>
                </div>

                <div className="flex justify-between items-center px-4 py-2 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <Sword className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-[10px] text-white/60 uppercase">
                      Attack
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-400">
                    {boss.attack} POW
                  </span>
                </div>
              </div>

              {/* Rewards */}
              <div className="w-full flex items-center justify-center gap-4 py-3 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="text-wizard-gold font-bold text-xs">
                    {boss.reward.coins}
                  </span>
                  <Trophy className="w-3 h-3 text-wizard-gold/60" />
                </div>
                <div className="w-px h-3 bg-white/10"></div>
                <div className="flex items-center gap-1.5">
                  <span className="text-wizard-pink font-bold text-xs">
                    {boss.reward.xp}
                  </span>
                  <Zap className="w-3 h-3 text-wizard-pink/60" />
                </div>
                <div className="w-px h-3 bg-white/10"></div>
                <span className="text-[9px] uppercase tracking-tighter text-white/40">
                  Rewards
                </span>
              </div>

              {/* Hover Action */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-wizard-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
