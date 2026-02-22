import React, { useState } from "react";
import { Wand2, Sparkles, UserPlus, LogIn } from "lucide-react";

interface LoginPageProps {
  onLogin: (name: string) => void;
  onRegister: (name: string) => void;
  onBackToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onRegister,
  onBackToHome,
}) => {
  const [nameInput, setNameInput] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    if (isRegistering) {
      onRegister(nameInput);
    } else {
      onLogin(nameInput);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-wizard-indigo text-white flex items-center justify-center p-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(26, 16, 51, 0.85), rgba(26, 16, 51, 0.95)), url("/pixzard_lab_bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="glass-card p-12 rounded-3xl pixel-border max-w-md w-full text-center">
        <div className="flex items-center justify-between mb-8 relative">
          <button
            onClick={onBackToHome}
            className="absolute left-0 p-2 text-white/40 hover:text-white transition-colors hover:-translate-x-1"
            title="Back to Landing Page"
          >
            &#x2190; Back
          </button>
          <div className="p-6 bg-wizard-accent w-24 h-24 rounded-2xl mx-auto glow-purple animate-pulse flex items-center justify-center">
            <Wand2 className="w-12 h-12 text-wizard-gold" />
          </div>
        </div>

        <h1 className="pixel-text text-2xl text-wizard-gold mb-4 uppercase tracking-tighter">
          PIXZARD LAB
        </h1>
        <p className="text-xs opacity-60 mb-8 font-light italic">
          {isRegistering
            ? "Register your magic signature to enter"
            : "Welcome back, master alchemist"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Wizard Name..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full bg-black/40 border-2 border-wizard-accent/30 p-4 rounded-xl focus:border-wizard-pink outline-none text-center text-lg"
          />
          <button
            type="submit"
            className="w-full py-4 pixel-text text-xs bg-linear-to-r from-wizard-accent to-wizard-pink premium-btn shadow-xl flex items-center justify-center gap-2"
          >
            {isRegistering ? (
              <UserPlus className="w-4 h-4" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {isRegistering ? "JOIN THE LABORATORY" : "ENTER LABORATORY"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs text-wizard-pink hover:text-wizard-gold transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles className="w-3 h-3" />
            {isRegistering
              ? "Already a wizard? Login here"
              : "New alchemist? Create your profile"}
          </button>
        </div>
      </div>
    </div>
  );
};
