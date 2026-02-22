import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Flame, Droplets, Zap, Skull, X } from "lucide-react";
import { Player, Ingredient } from "../types";
import { INGREDIENTS } from "./BrewingStation";

interface MagicForestProps {
  player: Player;
  onClose: () => void;
  onGather: (materialKey: keyof Player) => void;
}

interface ForestItem {
  id: number;
  type: Ingredient;
  x: number;
  y: number;
  scale: number;
}

const MagicForest: React.FC<MagicForestProps> = ({
  player,
  onClose,
  onGather,
}) => {
  const [items, setItems] = useState<ForestItem[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<"playing" | "ended">("playing");
  const containerRef = useRef<HTMLDivElement>(null);

  // Timer logic
  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) {
      setGameState("ended");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState !== "playing") return;
      if (items.length < 6) {
        const isCursed = Math.random() < 0.15; // 15% chance for cursed item
        const randomIng = isCursed
          ? {
              id: "cursed",
              name: "Cursed Essence",
              icon: <Skull className="w-5 h-5" />,
              color: "text-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]",
            }
          : INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)];

        const newItem: ForestItem = {
          id: Date.now() + Math.random(),
          type: randomIng as Ingredient,
          x: Math.random() * 80 + 10,
          y: Math.random() * 50 + 20,
          scale: 0.6 + Math.random() * 0.4,
        };
        setItems((prev) => [...prev, newItem]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [items]);

  const handleGather = (item: ForestItem) => {
    if (item.type.name === "Cursed Essence") {
      setScore(0); // Harsh penalty
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      return;
    }

    const mapping: Record<string, keyof Player> = {
      "Dragon Scale": "dragonScales",
      "Moon Leaf": "moonLeaves",
      "Storm Core": "stormCores",
      Nightshade: "nightshade",
      "Phoenix Feather": "phoenixFeathers",
      "Ghost Mist": "ghostMist",
    };

    const key = mapping[item.type.name];
    if (key) {
      onGather(key);
      setScore((prev) => prev + 1);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  const wandCursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M2 28L28 2L30 4L4 30L2 28Z" fill="white" stroke="%236d28d9" stroke-width="1"/><path d="M28 2L30 4L26 8L24 6L28 2Z" fill="%23facc15"/><circle cx="28" cy="4" r="2" fill="%23facc15"><animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" /></circle></svg>') 0 0, auto`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500 overflow-y-auto"
      style={{ cursor: wandCursor }}
    >
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <div
          ref={containerRef}
          className="relative w-full h-[600px] glass-card rounded-3xl pixel-border overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]"
          style={{
            backgroundImage: `url('/magic_forest_bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Cinematic Dark Overlay & Vignette */}
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80 z-0"></div>
          <div className="absolute inset-0 bg-emerald-950/20 z-0"></div>
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.7)] z-0"></div>

          {/* Animated Environment FX */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Pulsing Fireflies */}
            <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full blur-[2px] animate-pulse shadow-[0_0_10px_#34d399]" />
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-300 rounded-full blur-[2px] animate-pulse delay-700 shadow-[0_0_8px_#fde047]" />
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full blur-[2px] animate-pulse delay-1000 shadow-[0_0_12px_#22d3ee]" />
            <div className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-emerald-500 rounded-full blur-[1px] animate-pulse delay-500" />

            {/* Magical Glade Bloom */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full" />
          </div>

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-black/40 backdrop-blur-sm border-b border-white/10 z-10">
            <div>
              <h2 className="pixel-text text-xl text-wizard-gold flex items-center gap-3">
                <Sparkles className="w-6 h-6 animate-pulse" /> Enchanted Forest
              </h2>
              <p className="text-[10px] opacity-60 mt-1 uppercase tracking-widest">
                Gather materials for your potions
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-[10px] opacity-40 uppercase">
                  Time Remaining
                </p>
                <p
                  className={`pixel-text text-lg ${timeLeft < 10 ? "text-red-500 animate-pulse" : "text-emerald-400"}`}
                >
                  {timeLeft}s
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] opacity-40 uppercase">Gathers</p>
                <p className="pixel-text text-lg text-wizard-pink">{score}</p>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-red-500/20 rounded-xl transition-colors border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="relative w-full h-full pt-24">
            {gameState === "playing" ? (
              items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleGather(item)}
                  className={`absolute p-4 rounded-full border shadow-2xl backdrop-blur-sm transition-all hover:scale-110 active:scale-90 animate-bounce group ${
                    item.type.name === "Cursed Essence"
                      ? "bg-red-900/40 border-red-500/50"
                      : "bg-wizard-purple/40 border-white/20"
                  }`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: `scale(${item.scale})`,
                    cursor: wandCursor,
                  }}
                >
                  <div
                    className={`transition-transform group-hover:rotate-12 ${item.type.color}`}
                  >
                    {item.type.icon}
                  </div>
                  <div
                    className={`absolute -inset-1 rounded-full blur-md animate-pulse -z-10 ${
                      item.type.name === "Cursed Essence"
                        ? "bg-red-600/30"
                        : "bg-wizard-gold/20"
                    }`}
                  />
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold">
                    {item.type.name}
                  </span>
                </button>
              ))
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm animate-in zoom-in duration-300">
                <div className="text-center p-8 glass-card rounded-3xl border-2 border-wizard-gold/50 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                  <h3 className="pixel-text text-2xl text-wizard-gold mb-2">
                    Gathering Over
                  </h3>
                  <p className="text-wizard-pink mb-6 uppercase tracking-widest text-xs">
                    {score >= 15
                      ? "legendary harvester!"
                      : score >= 8
                        ? "Skilled alchemist"
                        : "Apprentice gatherer"}
                  </p>

                  <div className="flex gap-8 justify-center mb-8">
                    <div className="text-center">
                      <p className="text-[10px] opacity-40 uppercase mb-1">
                        Total Ingredients
                      </p>
                      <p className="pixel-text text-3xl text-white">{score}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setScore(0);
                        setTimeLeft(30);
                        setGameState("playing");
                        setItems([]);
                      }}
                      className="flex-1 py-4 px-8 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 text-sm"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-4 px-8 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all text-sm"
                    >
                      Return to Lab
                    </button>
                  </div>
                </div>
              </div>
            )}

            {gameState === "playing" && items.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="pixel-text text-sm opacity-20 animate-pulse">
                  Waiting for magical essence to manifest...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Inventory Footer - Now Outside and Styled as a HUD */}
        <div className="glass-card p-4 grid grid-cols-6 gap-2 rounded-2xl pixel-border border-white/5 bg-black/40">
          {[
            {
              label: "Dragon Scales",
              count: player.dragonScales,
              color: "text-red-500",
              icon: <Flame className="w-4 h-4" />,
            },
            {
              label: "Moon Leaves",
              count: player.moonLeaves,
              color: "text-blue-300",
              icon: <Droplets className="w-4 h-4" />,
            },
            {
              label: "Storm Cores",
              count: player.stormCores,
              color: "text-yellow-400",
              icon: <Zap className="w-4 h-4" />,
            },
            {
              label: "Nightshade",
              count: player.nightshade,
              color: "text-purple-500",
              icon: <Skull className="w-4 h-4" />,
            },
            {
              label: "P. Feather",
              count: player.phoenixFeathers,
              color: "text-orange-500",
              icon: <Zap className="w-4 h-4" />,
            },
            {
              label: "Ghost Mist",
              count: player.ghostMist,
              color: "text-slate-300",
              icon: <Sparkles className="w-4 h-4" />,
            },
          ].map((mat) => (
            <div
              key={mat.label}
              className="bg-black/40 p-2 rounded-xl border border-white/5 flex flex-col items-center hover:bg-white/5 transition-colors group"
            >
              <div
                className={`${mat.color} group-hover:scale-110 transition-transform`}
              >
                {mat.icon}
              </div>
              <span className="text-[10px] opacity-40 mt-1 hidden sm:block">
                {mat.label}
              </span>
              <span className="pixel-text text-xs mt-1 text-white/90">
                {mat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MagicForest;
