"use client";

import { useState } from "react";
import { SOCIAL } from "../data/socialLinks";

export default function FooterContact() {
  const [copied, setCopied] = useState("");
  const phone = "062-209-5297";
  const email = "Nasran@thaivis.com";

  const handleCopy = async (val, label) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-[95vw] sm:max-w-5xl px-4 sm:px-6">
      <div className="bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-lg backdrop-blur flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between text-white">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="text-sm text-zinc-400">Phone</div>
          <a href={"tel:" + phone.replace(/[^0-9+]/g, "")} className="font-medium text-emerald-400">{phone}</a>
          <button onClick={() => handleCopy(phone, "phone")} className="sm:ml-2 text-xs sm:text-sm px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-white w-max">{copied === "phone" ? "Copied" : "Copy"}</button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="text-sm text-zinc-400">Email</div>
          <a href={"mailto:" + email} className="font-medium text-sky-400">{email}</a>
          <button onClick={() => handleCopy(email, "email")} className="sm:ml-2 text-xs sm:text-sm px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-white w-max">{copied === "email" ? "Copied" : "Copy"}</button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {SOCIAL.facebook && (
            <a href={SOCIAL.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.1 5.66 21.24 10.44 22v-7.03H7.9V12.07h2.54V9.79c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.6.76-1.6 1.54v1.86h2.72l-.44 2.9h-2.28V22C18.34 21.24 22 17.1 22 12.07z"/></svg>
              <span className="hidden sm:inline">Facebook</span>
            </a>
          )}

          {SOCIAL.instagram && (
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm8 3h-6a1 1 0 0 0-1 1v2h8V6a1 1 0 0 0-1-1zm-3 5a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 10z"/></svg>
              <span className="hidden sm:inline">Instagram</span>
            </a>
          )}

          {SOCIAL.tiktok && (
            <a href={SOCIAL.tiktok} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded bg-white/10 text-white hover:bg-white/20 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3h2.5v1.9A5 5 0 0 0 21 5v3.5a3.5 3.5 0 1 1-3.5-3.5V3zM9 8.5A5.5 5.5 0 1 0 14.5 14v-2.2A3.2 3.2 0 1 1 11 8.5V17a5 5 0 1 1-5-5v-3.5A5 5 0 0 0 9 17v-8.5z"/></svg>
              <span className="hidden sm:inline">TikTok</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
