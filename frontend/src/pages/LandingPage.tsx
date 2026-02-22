import React from "react";
import { Sparkles, Beaker, Trees, Sword, ChevronRight } from "lucide-react";

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-wizard-indigo text-white selection:bg-wizard-pink/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/pixzard_logo.png"
              alt="Logo"
              className="w-8 h-8"
              style={{ imageRendering: "pixelated" }}
            />
            <span className="pixel-text text-xl tracking-tighter bg-linear-to-r from-wizard-gold to-wizard-pink bg-clip-text text-transparent">
              PIXZARD
            </span>
          </div>
          <button
            onClick={onEnter}
            className="px-6 py-2 bg-wizard-accent hover:opacity-90 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95"
          >
            Play Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-wizard-purple/20 to-transparent"></div>
          <div className="absolute top-40 left-1/4 w-96 h-96 bg-wizard-pink/20 blur-[120px] rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="pixel-text text-4xl md:text-7xl mb-6 leading-tight tracking-widest drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            BECOME THE ULTIMATE <br />
            <span className="text-wizard-gold">PIXEL ALCHEMIST</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/60 text-lg mb-12 uppercase tracking-widest font-light">
            Brew powerful potions, gather mystical essences, and battle ancient
            drakes in a 16-bit world of magic and steel.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button
              onClick={onEnter}
              className="group w-full sm:w-auto px-12 py-5 bg-linear-to-r from-wizard-accent to-wizard-pink rounded-2xl font-bold text-xl shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
              Start Your Journey
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-1 bg-linear-to-r from-wizard-gold via-wizard-pink to-wizard-accent rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-card rounded-[2.5rem] p-4 overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/pixzard_hero.png"
                alt="Gameplay"
                className="w-full rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl border-white/5 hover:border-wizard-accent/30 transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-wizard-purple/20 rounded-2xl flex items-center justify-center mb-6 text-wizard-purple animate-bounce">
                <Beaker className="w-8 h-8" />
              </div>
              <h3 className="pixel-text text-xl mb-4 group-hover:text-wizard-gold transition-colors">
                Master Alchemy
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Combine up to three mystical ingredients to discover thousands
                of unique potion combinations with varying rarities.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border-white/5 hover:border-emerald-400/30 transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-emerald-400/10 rounded-2xl flex items-center justify-center mb-6 text-emerald-400 animate-pulse">
                <Trees className="w-8 h-8" />
              </div>
              <h3 className="pixel-text text-xl mb-4 group-hover:text-emerald-400 transition-colors">
                Enchanted Foraging
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Venture into the heart of the Magic Forest to gather Dragon
                Scales, Moon Leaves, and Storm Cores at the risk of your own XP.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border-white/5 hover:border-red-500/30 transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                <Sword className="w-8 h-8 group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="pixel-text text-xl mb-4 group-hover:text-red-500 transition-colors">
                Epic Boss Battles
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Test your brews against the Ancient Emerald Drake in a
                synchronized turn-based combat arena for massive rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-wizard-accent/10 blur-[150px] -z-10"></div>
        <div className="max-w-3xl mx-auto text-center px-6">
          <Sparkles className="w-12 h-12 text-wizard-gold mx-auto mb-8 animate-spin-slow" />
          <h2 className="pixel-text text-3xl md:text-5xl mb-8">
            READY TO BREW YOUR LEGACY?
          </h2>
          <button
            onClick={onEnter}
            className="px-16 py-6 bg-white text-black rounded-2xl font-bold text-xl hover:bg-wizard-gold transition-all transform hover:scale-105 shadow-2xl"
          >
            ENTER THE LABORATORY
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <img
              src="/pixzard_logo.png"
              alt="Logo"
              className="w-6 h-6"
              style={{ imageRendering: "pixelated" }}
            />
            <span className="pixel-text text-sm opacity-60 italic">
              PIXZARD - A Retro Wizard Adventure
            </span>
          </div>
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest opacity-40">
            <a href="#" className="hover:text-white transition-colors">
              Lore
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Grimoire
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Alchemists
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
