"use client";

import { ChevronLeft, Zap, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function ScanPage() {
  const [mode, setMode] = useState<'single' | 'struk'>('single');
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white relative overflow-hidden">

      {/* Fake Camera Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={mode === 'single'
            ? '/assets/sosis-scan-product_1790397566058.avif'
            : '/assets/struk-scan_1790397790384.webp'
          }
          alt="Camera View"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 px-4 flex items-center">
        <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold ml-2">{t.home_scan_btn.replace('\n', ' ')}</h1>
      </div>

      {/* Viewfinder */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        <p className="text-center font-semibold text-sm mb-8 drop-shadow-md text-white/90">
          {t.scan_desc}
        </p>

        {/* Scan Frame */}
        <div className="w-full max-w-[260px] aspect-square relative">
          {/* Dimmed overlay with hole */}
          <div className="absolute inset-0 rounded-3xl border-[3px] border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]" />
          
          {/* Animated pulse border */}
          <div className="absolute inset-1 rounded-[20px] border-2 border-[#3CC63C] animate-pulse opacity-70" />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-7 h-7 border-t-4 border-l-4 border-[#3CC63C] rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-7 h-7 border-t-4 border-r-4 border-[#3CC63C] rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-7 h-7 border-b-4 border-l-4 border-[#3CC63C] rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-7 h-7 border-b-4 border-r-4 border-[#3CC63C] rounded-br-3xl" />
        </div>

        {/* Mode Toggle */}
        <div className="mt-10 bg-white/15 backdrop-blur-sm border border-white/20 p-1 rounded-full flex">
          <button
            onClick={() => setMode('single')}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
              mode === 'single' ? 'bg-gray-600/80 text-white' : 'text-white/70'
            }`}
          >
            {t.scan_mode_single}
          </button>
          <button
            onClick={() => setMode('struk')}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
              mode === 'struk' ? 'bg-gray-600/80 text-white' : 'text-white/70'
            }`}
          >
            {t.scan_mode_receipt}
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 pb-12 pt-4 px-8 flex justify-between items-center">
        <button className="p-3 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20">
          <ImageIcon className="w-6 h-6" strokeWidth={1.8} />
        </button>

        <Link
          href="/ingredients"
          className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center shadow-xl active:scale-95 transition-transform"
        >
          <div className="w-16 h-16 bg-white rounded-full" />
        </Link>

        <button className="p-3 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20">
          <Zap className="w-6 h-6" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
