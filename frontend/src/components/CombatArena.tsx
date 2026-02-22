import React, { useState, useEffect } from "react";
import { Shield, Sword, X, Zap, Sparkles, Heart } from "lucide-react";
import { Player, Potion, Boss } from "../types";
import { getPotionStats, getEnhancedDescription } from "../potionUtils";

interface Monster {
  name: string;
  maxHp: number;
  hp: number;
  attack: number;
  image: string;
}

interface CombatArenaProps {
  player: Player;
  playerHp: number;
  setPlayerHp: React.Dispatch<React.SetStateAction<number>>;
  potions: Potion[];
  selectedBoss: Boss;
  onClose: () => void;
  onVictory: (rewardCoins: number, rewardXp: number) => void;
  onUsePotion: (potion: Potion) => { damage: number; heal: number };
  onConsumePotion: (potion: Potion) => Promise<void>;
}

export const CombatArena: React.FC<CombatArenaProps> = ({
  playerHp,
  setPlayerHp,
  potions,
  selectedBoss,
  onClose,
  onVictory,
  onUsePotion,
  onConsumePotion,
}) => {
  const [monster, setMonster] = useState<Monster>({
    name: selectedBoss.name,
    maxHp: selectedBoss.maxHp,
    hp: selectedBoss.maxHp,
    attack: selectedBoss.attack,
    image: selectedBoss.image,
  });

  const [combatLog, setCombatLog] = useState<string[]>([
    `A powerful ${selectedBoss.name} appears!`,
  ]);
  const [turn, setTurn] = useState<"player" | "monster">("player");
  const [isAnimating, setIsAnimating] = useState(false);
  const [result, setResult] = useState<"victory" | "defeat" | null>(null);

  // Animation states
  const [monsterState, setMonsterState] = useState<
    "idle" | "attacking" | "hit"
  >("idle");
  const [playerState, setPlayerState] = useState<"idle" | "attacking" | "hit">(
    "idle",
  );
  const [showSlash, setShowSlash] = useState(false);

  const addLog = (msg: string) => {
    setCombatLog((prev) => [msg, ...prev].slice(0, 5));
  };

  const handleMonsterTurn = () => {
    if (result) return;
    setIsAnimating(true);

    // Dragon windup
    setTimeout(() => {
      setMonsterState("attacking");

      setTimeout(() => {
        const damage = Math.floor(monster.attack * (0.8 + Math.random() * 0.4));

        setPlayerHp((prev) => {
          const nextHp = Math.max(0, prev - damage);

          // We check the result here too to be safe, but we'll also use
          // a separate timeout for the turn transition to keep it smooth
          setTimeout(() => {
            setMonsterState("idle");
            setPlayerState("idle");
            if (nextHp <= 0) {
              setResult("defeat");
            } else {
              setTurn("player");
            }
            setIsAnimating(false);
          }, 500);

          return nextHp;
        });

        setPlayerState("hit");
        addLog(`${monster.name} attacks for ${damage} damage!`);
      }, 500);
    }, 500);
  };

  useEffect(() => {
    if (turn === "monster" && !result) {
      handleMonsterTurn();
    }
  }, [turn]);

  const handlePlayerAttack = () => {
    if (turn !== "player" || isAnimating || result) return;

    setIsAnimating(true);
    setPlayerState("attacking");

    setTimeout(() => {
      setShowSlash(true);
      setMonsterState("hit");
      const damage = 20 + Math.floor(Math.random() * 15);

      setMonster((prev) => {
        const nextMonsterHp = Math.max(0, prev.hp - damage);

        setTimeout(() => {
          setShowSlash(false);
          setMonsterState("idle");
          setPlayerState("idle");
          if (nextMonsterHp <= 0) {
            setResult("victory");
            onVictory(selectedBoss.reward.coins, selectedBoss.reward.xp);
          } else {
            setTurn("monster");
          }
          setIsAnimating(false);
        }, 500);

        return { ...prev, hp: nextMonsterHp };
      });

      addLog(`You strike the enemy for ${damage} damage!`);
    }, 500);
  };

  const handlePotionUse = (potion: Potion) => {
    if (turn !== "player" || isAnimating || result) return;
    setIsAnimating(true);

    // Consume potion essence
    onConsumePotion(potion);

    const { damage, heal } = onUsePotion(potion);

    if (damage > 0) {
      setShowSlash(true);
      setMonsterState("hit");
      setMonster((prev) => {
        const nextMonsterHp = Math.max(0, prev.hp - damage);

        if (nextMonsterHp <= 0) {
          setTimeout(() => {
            setResult("victory");
            onVictory(selectedBoss.reward.coins, selectedBoss.reward.xp);
          }, 500);
        }

        return { ...prev, hp: nextMonsterHp };
      });
      addLog(`Used ${potion.name}! Dealt ${damage} magical damage!`);
    }

    if (heal > 0) {
      setPlayerHp((prev) => Math.min(100, prev + heal));
      addLog(`Used ${potion.name}! Healed for ${heal} HP!`);
    }

    setTimeout(() => {
      setShowSlash(false);
      setMonsterState("idle");
      // Only transition turn if the dragon is still alive
      setMonster((prev) => {
        if (prev.hp > 0) {
          setTurn("monster");
          setIsAnimating(false);
        }
        return prev;
      });
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500 overflow-y-auto">
      <style>{`
        @keyframes shake-hit {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes monster-lunge {
          0% { transform: scale(1) translateX(0); }
          50% { transform: scale(1.1) translateX(50px); filter: brightness(1.5); }
          100% { transform: scale(1) translateX(0); }
        }
        @keyframes player-lunge {
          0% { transform: translateX(0); }
          50% { transform: translateX(-50px) scale(1.1); filter: brightness(1.5); }
          100% { transform: translateX(0); }
        }
        @keyframes slash {
          0% { opacity: 0; transform: scale(0.5) rotate(-45deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(45deg); }
          100% { opacity: 0; transform: scale(1.5) rotate(90deg); }
        }
        .monster-hit { animation: shake-hit 0.2s ease-in-out infinite; }
        .monster-attack { animation: monster-lunge 0.5s ease-in-out; }
        .player-hit { animation: shake-hit 0.2s ease-in-out infinite; }
        .player-attack { animation: player-lunge 0.5s ease-in-out; }
        .slash-fx { animation: slash 0.4s ease-out forwards; }
      `}</style>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto">
        {/* Battle Header */}
        <div className="lg:col-span-12 flex items-center justify-center mb-2 animate-in slide-in-from-top duration-700">
          <div className="flex items-center gap-4 bg-black/60 px-8 py-3 rounded-2xl border border-wizard-accent/30 backdrop-blur-xl shadow-2xl">
            <img
              src="/pixzard_logo.png"
              alt="Logo"
              className="w-6 h-6 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
            <h1 className="pixel-text text-lg tracking-[0.3em] text-wizard-gold flex items-center gap-6">
              <span className="opacity-20">---</span>
              COMBAT ARENA
              <span className="opacity-20">---</span>
            </h1>
            <img
              src="/pixzard_logo.png"
              alt="Logo"
              className="w-6 h-6 object-contain rotate-180"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>

        {/* Battle Arena */}
        <div
          className="lg:col-span-9 relative glass-card rounded-3xl pixel-border h-[500px] lg:h-[650px] overflow-hidden flex items-end justify-between px-12 pb-24 shadow-2xl"
          style={{
            backgroundImage: `url('${selectedBoss.background}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Cinematic Dark Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-black/80 z-0"></div>
          <div className="absolute inset-0 bg-wizard-indigo/20 z-0"></div>
          {/* Vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-0"></div>
          {/* Monster Section */}
          <div className="flex flex-col items-center gap-4 relative">
            {/* Monster HP Bar */}
            <div className="absolute -top-32 w-48 animate-in slide-in-from-top duration-500">
              <div className="flex justify-between items-end mb-2">
                <span className="pixel-text text-[10px] text-red-500">
                  {monster.name}
                </span>
                <span className="text-[10px] opacity-60 font-mono">
                  {monster.hp}/{monster.maxHp}
                </span>
              </div>
              <div className="w-full h-3 bg-black/60 rounded-full border border-white/10 overflow-hidden shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <div
                  className="h-full bg-linear-to-r from-red-600 to-orange-500 transition-all duration-500"
                  style={{ width: `${(monster.hp / monster.maxHp) * 100}%` }}
                />
              </div>
            </div>

            {/* Monster Sprite */}
            <div
              className={`relative transition-all duration-300 ${
                monsterState === "hit"
                  ? "monster-hit"
                  : monsterState === "attacking"
                    ? "monster-attack"
                    : ""
              }`}
            >
              <img
                src={monster.image}
                alt={monster.name}
                className="w-48 h-48 lg:w-80 lg:h-80 object-contain filter drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                style={{
                  imageRendering: "pixelated",
                  transform:
                    monster.name === "Ancient Emerald Drake"
                      ? "none"
                      : "scaleX(-1)",
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <Sparkles
                  className={`w-32 h-32 text-red-500 transition-opacity duration-300 ${monsterState === "hit" ? "opacity-100 scale-150" : "opacity-0 scale-50"}`}
                />
              </div>
              {showSlash && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Sword className="w-48 h-48 text-white slash-fx drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
                </div>
              )}
            </div>
          </div>

          {/* Player Section */}
          <div className="flex flex-col items-center gap-4 relative">
            {/* Player HP Bar */}
            <div className="absolute -top-32 w-48 animate-in slide-in-from-top duration-500 delay-100">
              <div className="flex justify-between items-end mb-2">
                <span className="pixel-text text-[10px] text-wizard-pink">
                  WIZARD
                </span>
                <span className="text-[10px] opacity-60 font-mono">
                  {playerHp}%
                </span>
              </div>
              <div className="w-full h-3 bg-black/60 rounded-full border border-white/10 overflow-hidden shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                <div
                  className="h-full bg-linear-to-r from-wizard-pink to-wizard-purple transition-all duration-500"
                  style={{ width: `${playerHp}%` }}
                />
              </div>
            </div>

            {/* Player Sprite */}
            <div
              className={`relative transition-all duration-300 ${
                playerState === "hit"
                  ? "player-hit"
                  : playerState === "attacking"
                    ? "player-attack"
                    : ""
              }`}
            >
              <img
                src="/retro_wizard.png"
                alt="Player"
                className="w-40 h-40 lg:w-64 lg:h-64 object-contain filter drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <Sparkles
                  className={`w-32 h-32 text-wizard-purple transition-opacity duration-300 ${playerState === "hit" ? "opacity-100 scale-150" : "opacity-0 scale-50"}`}
                />
              </div>
            </div>
          </div>

          {/* Combat Log Overlay (Fixed: Newest at bottom, rises and fades) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md flex flex-col-reverse items-center gap-1.5 z-10 px-6">
            {combatLog.map((log, i) => (
              <div
                key={i}
                className={`text-[9px] pixel-text text-center px-4 py-1.5 rounded-full border transition-all duration-500 ${
                  i === 0
                    ? "text-white border-wizard-accent/40 bg-wizard-indigo/60 shadow-[0_0_15px_rgba(168,85,247,0.2)] opacity-100 scale-100"
                    : i === 1
                      ? "text-white/50 border-white/10 bg-black/40 opacity-60 scale-95"
                      : "text-white/10 border-transparent bg-transparent opacity-20 scale-90"
                }`}
              >
                {log}
              </div>
            ))}
          </div>

          {/* Result Overlay */}
          {result && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center animate-in zoom-in duration-300 z-20">
              <h2
                className={`pixel-text text-3xl mb-4 text-center ${result === "victory" ? "text-wizard-gold" : "text-red-500"}`}
              >
                {result === "victory"
                  ? `${selectedBoss.name} DEFEATED!`
                  : "FATED DEFEAT"}
              </h2>
              <p className="text-white/60 mb-8 uppercase tracking-widest text-center text-xs">
                {result === "victory"
                  ? `+${selectedBoss.reward.coins} Coins | +${selectedBoss.reward.xp} XP`
                  : `${selectedBoss.name} was too powerful...`}
              </p>
              <button
                onClick={onClose}
                className="py-4 px-12 bg-wizard-accent hover:opacity-90 rounded-2xl font-bold transition-all transform hover:scale-105"
              >
                Return to Laboratory
              </button>
            </div>
          )}
        </div>

        {/* Player Controls Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="glass-card p-6 rounded-3xl border-white/10 flex flex-col gap-4">
            <h4 className="pixel-text text-[10px] text-wizard-gold flex items-center gap-2">
              <Shield className="w-4 h-4" /> Tactics
            </h4>
            <div className="grid grid-cols-1 gap-3 relative">
              <button
                onClick={handlePlayerAttack}
                disabled={turn !== "player" || isAnimating || !!result}
                className={`group w-full py-4 bg-white/5 hover:bg-wizard-accent/20 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all disabled:opacity-20 hover:z-30 relative`}
              >
                {/* Strike Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 w-44 p-3 bg-wizard-indigo/98 rounded-xl border border-wizard-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.15)] opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-x-1">
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-6 border-transparent border-l-wizard-gold/30"></div>
                  <div className="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-white/5">
                    <Sword className="w-3.5 h-3.5 text-red-500" />
                    <span className="pixel-text text-[8px] text-wizard-gold uppercase tracking-wider">
                      Basic Strike
                    </span>
                  </div>
                  <p className="text-[9px] text-white/50 leading-relaxed italic mb-2">
                    Focus your arcane energy into a swift, physical strike.
                  </p>
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="opacity-40 uppercase tracking-tighter">
                      Potency
                    </span>
                    <span className="text-red-400 font-bold font-mono">
                      20-35 DMG
                    </span>
                  </div>
                </div>

                <Sword className="w-5 h-5 text-wizard-gold group-hover:scale-110 transition-transform" />
                <span className="font-bold uppercase tracking-widest text-[10px]">
                  Strike
                </span>
              </button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border-white/10 flex-col flex-1 flex overflow-visible">
            <h4 className="pixel-text text-[10px] text-wizard-gold mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Grimoire
            </h4>
            <div className="flex-1 space-y-4 pr-1">
              {potions.length === 0 ? (
                <p className="text-[10px] opacity-20 italic text-center py-8">
                  No brews ready...
                </p>
              ) : (
                potions.map((potion) => {
                  const stats = getPotionStats(potion);
                  return (
                    <div key={potion.id} className="relative group">
                      <button
                        onClick={() => handlePotionUse(potion)}
                        disabled={turn !== "player" || isAnimating || !!result}
                        className="w-full p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl flex items-center justify-between group transition-all disabled:opacity-20 translate-z-0 hover:border-wizard-accent/50 hover:z-40"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor]"
                            style={{
                              background: `linear-gradient(${potion.color.replace(",", ",")})`,
                              color: potion.color.split(",")[0],
                            }}
                          />
                          <div className="text-left">
                            <p className="text-[10px] font-bold line-clamp-1 group-hover:text-wizard-gold transition-colors">
                              {potion.name}
                            </p>
                            <p className="text-[8px] opacity-40 uppercase">
                              {potion.rarity}
                            </p>
                          </div>
                        </div>
                        <span className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full font-mono text-wizard-gold group-hover:bg-wizard-gold/20 transition-all">
                          x{potion.quantity || 1}
                        </span>
                      </button>

                      {/* Combat Potion Tooltip (Improved) */}
                      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 w-52 p-3 bg-wizard-indigo/98 backdrop-blur-md rounded-xl border border-wizard-accent/40 shadow-[0_0_30px_rgba(168,85,247,0.2)] opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-x-1 z-50">
                        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-6 border-transparent border-l-wizard-accent/40"></div>

                        <div className="flex items-center justify-around gap-2 mb-2 pb-2 border-b border-white/5">
                          <div className="flex flex-col items-center">
                            <Sword className="w-3.5 h-3.5 text-red-500 mb-0.5" />
                            <span className="text-[10px] font-bold text-red-400 leading-none">
                              {stats.damage}
                            </span>
                          </div>
                          <div className="h-4 w-px bg-white/5"></div>
                          <div className="flex flex-col items-center">
                            <Heart className="w-3.5 h-3.5 text-emerald-500 mb-0.5" />
                            <span className="text-[10px] font-bold text-emerald-400 leading-none">
                              {stats.heal}
                            </span>
                          </div>
                          <div className="h-4 w-px bg-white/5"></div>
                          <div className="flex flex-col items-center">
                            <span className="text-[7px] px-1.5 py-0.5 rounded-sm border border-wizard-gold/20 uppercase text-wizard-gold/60 font-bold bg-wizard-gold/5">
                              {potion.rarity}
                            </span>
                          </div>
                        </div>

                        <p className="text-[9px] text-white/60 leading-relaxed italic text-center px-1">
                          "{getEnhancedDescription(potion.name, potion.effect)}"
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl flex items-center justify-center gap-2 text-red-400 transition-all font-bold uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95"
          >
            <X className="w-3 h-3" /> Retreat
          </button>
        </div>
      </div>
    </div>
  );
};
