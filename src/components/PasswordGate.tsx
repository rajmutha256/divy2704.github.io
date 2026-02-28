"use client";

import { useState } from "react";

type PasswordGateProps = {
  secret: string;
  onUnlock: () => void;
};

export default function PasswordGate({ secret, onUnlock }: PasswordGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (value.trim().toLowerCase() === secret) {
      setError("");
      onUnlock();
      return;
    }

    setError("Wrong password silly");
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  };

  return (
    <section className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4 py-6 sm:px-6">
      <div
        className={`w-full max-w-xl rounded-[2rem] bg-white/75 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:rounded-[2.5rem] sm:p-8 md:rounded-[3rem] md:p-10 ${
          shake ? "animate-shake" : ""
        }`}
      >
        <h1 className="text-center text-2xl font-semibold text-slate sm:text-3xl md:text-4xl">
          🌸 Only For My Favorite Flower Girl 🌸
        </h1>

        <p className="mt-4 text-center text-slate-soft">Enter the password to open your flower garden.</p>

        <input
          type="password"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSubmit();
          }}
          placeholder="Password"
          className="mt-6 w-full rounded-2xl border-0 bg-cream px-5 py-3 text-center text-base text-slate outline-none ring-2 ring-transparent transition duration-300 ease-in-out focus:ring-lavender sm:text-lg"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 w-full rounded-full bg-gradient-to-r from-pink-200 to-rose-200 px-6 py-3 text-base font-medium text-slate shadow-lg shadow-pink-200/50 transition duration-300 ease-in-out hover:scale-105 sm:text-lg"
        >
          Enter Garden 🌷
        </button>

        <p className="mt-3 min-h-6 text-center text-sm text-rose-500">{error}</p>
      </div>
    </section>
  );
}
