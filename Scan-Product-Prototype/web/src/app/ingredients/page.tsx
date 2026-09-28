"use client";

import { ChevronLeft, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function IngredientsPage() {
  const [stored, setStored] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-gray-50">

      {/* ── Background image hero ────────────────── */}
      <div className="h-60 relative w-full">
        <img
          src="/assets/1_sosis_1790397112218.png"
          alt="Sosis Sapi"
          className="w-full h-full object-contain bg-[#FFF0F0]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
        <div className="absolute top-12 left-4 z-10">
          <Link href="/scan" className="p-2 bg-black/30 backdrop-blur-md rounded-full inline-flex text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* ── Bottom Sheet Content ─────────────────── */}
      <div className="bg-white -mt-8 rounded-t-[32px] z-20 px-5 pt-6 flex-1 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">

        {/* Ingredient Header */}
        <div className="flex gap-4 mb-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-[#FFF0F0] flex items-center justify-center shadow-sm">
            <img src="/assets/1_sosis_1790397112218.png" alt="Sosis Sapi" className="w-16 h-16 object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-base leading-tight mb-1 text-gray-900">
              Sosis Sapi<br />Ready-to-Eat (250g)
            </h1>
            <p className="text-xs text-gray-400 mb-2">
              Input: 15 Sep 2026 · Exp: 18 Sep 2026
            </p>
            <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-md self-start">
              Expired in 3 days!
            </span>
          </div>
        </div>

        {/* Smart Storage Guide */}
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 text-base mb-3">Smart Storage Guide</h2>
          <div className="bg-[#DCFCE7] rounded-2xl p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-2">Fridge - Middle Shelf (Front)</h3>
            <p className="text-xs text-gray-700 leading-relaxed mb-3">
              Store in a sealed container or airtight packaging to keep them fresh and maintain their quality.
            </p>
            <button
              onClick={() => setStored(!stored)}
              className="flex items-center gap-2"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${stored ? 'border-[#3CC63C] bg-[#3CC63C]' : 'border-gray-400 bg-white'}`}>
                {stored && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <span className="text-xs font-semibold text-gray-700">Already put it on</span>
            </button>
          </div>
        </div>

        {/* Menu Recommendations */}
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 text-base mb-3">Menu Recommendation</h2>
          <div className="flex flex-col gap-3">

            {/* Menu 1 */}
            <div className="border border-gray-100 bg-white rounded-2xl p-3 flex gap-3 shadow-sm items-center">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <img src="/assets/0_tumis-sosis-asam-manis_1790397164033.png" alt="Tumis Sosis" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-gray-800 mb-1 leading-tight">Tumis Sosis Asam Manis</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" /> 10m
                </div>
              </div>
              <Link href="/receipt" className="shrink-0 text-[10px] text-[#3CC63C] font-bold border border-[#3CC63C] rounded-full px-3 py-1.5 whitespace-nowrap">
                See Cooking Steps
              </Link>
            </div>

            {/* Menu 2 */}
            <div className="border border-gray-100 bg-white rounded-2xl p-3 flex gap-3 shadow-sm items-center">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#FFF0F0] flex items-center justify-center">
                <img src="/assets/1_sosis_1790397112218.png" alt="Nasi Goreng Sosis" className="w-12 h-12 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-gray-800 mb-1 leading-tight">Nasi Goreng Sosis</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" /> 15m
                </div>
              </div>
              <Link href="/receipt" className="shrink-0 text-[10px] text-[#3CC63C] font-bold border border-[#3CC63C] rounded-full px-3 py-1.5 whitespace-nowrap">
                See Cooking Steps
              </Link>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-6">
          <Link href="/scan" className="flex-1 text-center py-3.5 rounded-2xl border-2 border-[#3CC63C] text-[#3CC63C] font-bold text-sm active:scale-95 transition-transform">
            Scan Other Ingredients
          </Link>
          <button className="flex-1 text-center py-3.5 rounded-2xl bg-[#3CC63C] text-white font-bold text-sm shadow-md active:scale-95 transition-transform">
            Save to My Kitchen
          </button>
        </div>
      </div>
    </div>
  );
}
