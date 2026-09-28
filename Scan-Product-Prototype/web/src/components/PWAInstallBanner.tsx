"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("[PWA] SW registered:", reg.scope))
        .catch((err) => console.error("[PWA] SW registration failed:", err));
    }

    // Check if already installed
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isStandalone) return; // Already installed, don't show banner

    // iOS detection
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    // Capture Android/Chrome install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Show iOS banner after short delay
    if (ios) {
      const dismissed = sessionStorage.getItem("pwa-banner-dismissed");
      if (!dismissed) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem("pwa-banner-dismissed", "true");
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Install Banner */}
      <div className="absolute bottom-24 left-4 right-4 z-[70] animate-in slide-in-from-bottom-4 duration-300">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
            <img src="/icon-192.png" alt="Savebite" className="w-full h-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm">Install Savebite</p>
            <p className="text-xs text-gray-500 leading-tight">Tambahkan ke layar utama HP</p>
          </div>
          <button
            onClick={handleInstall}
            className="px-3 py-2 bg-[#3CC63C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            Install
          </button>
          <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* iOS Step-by-step Guide */}
      {showIOSGuide && (
        <div className="absolute inset-0 z-[80] bg-black/60 flex items-end">
          <div className="w-full bg-white rounded-t-3xl p-6 pb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900 text-lg">Install di iPhone/iPad</h2>
              <button
                onClick={() => { setShowIOSGuide(false); setShowBanner(false); }}
                className="text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { step: 1, icon: "⬆️", text: 'Tap ikon "Share" (kotak dengan panah atas) di bagian bawah Safari' },
                { step: 2, icon: "➕", text: 'Scroll dan pilih "Add to Home Screen"' },
                { step: 3, icon: "✅", text: 'Ketuk "Add" di pojok kanan atas' },
              ].map(({ step, icon, text }) => (
                <div key={step} className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-[#3CC63C] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {step}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="mr-1">{icon}</span>{text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-green-50 rounded-xl p-3">
              <p className="text-xs text-green-700 text-center font-medium">
                <Smartphone className="w-4 h-4 inline mr-1" />
                Savebite akan tampil seperti aplikasi sungguhan di layar utama HP Anda!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
