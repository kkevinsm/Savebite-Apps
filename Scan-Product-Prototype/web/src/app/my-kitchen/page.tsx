"use client";

import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function MyKitchenPage() {
  const { t } = useLanguage();

  const ingredients = [
    {
      name: 'Sosis Sapi',
      desc: 'Ready-to-Eat · 250 g',
      expiry: `${t.kitchen_expired_in} 3 ${t.kitchen_days} · 18 Sep 2026`,
      urgent: true,
      img: '/assets/1_sosis_1790397112218.png',
      bg: '#FFF0F0',
    },
    {
      name: 'Sayur Mix',
      desc: '1 pack · 180 g',
      expiry: `${t.kitchen_expired_in} 5 ${t.kitchen_days} · 20 Sep 2026`,
      urgent: true,
      img: '/assets/0_sayur-mix_1790397112201.png',
      bg: '#F0FFF0',
    },
    {
      name: 'Yogurt',
      desc: 'Plain · 120 g',
      expiry: `${t.kitchen_expired_in} 6 ${t.kitchen_days} · 21 Sep 2026`,
      urgent: true,
      img: '/assets/2_yogurt_1790397112218.png',
      bg: '#F5F0FF',
    },
  ];

  return (
    <div className="flex flex-col min-h-full bg-gray-50">

      {/* ── Green Header ────────────────────────────── */}
      <div className="bg-[#3CC63C] px-5 pt-14 pb-8 rounded-b-[40px]">
        <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-1">
          {t.kitchen_label}
        </p>
        <div className="mb-1">
          <h1 className="text-3xl font-bold text-white">{t.kitchen_title}</h1>
        </div>
        <p className="text-white/80 text-sm">
          {t.kitchen_subtitle}
        </p>
      </div>

      {/* ── Ingredient List ──────────────────────────── */}
      <div className="px-5 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-900 text-base">{t.kitchen_all_items}</h2>
          <button className="text-sm font-semibold text-[#3CC63C]">{t.kitchen_sort}</button>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          {ingredients.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
            >
              <div
                className="w-16 h-16 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
                style={{ backgroundColor: item.bg }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-1">{item.desc}</p>
                <p className="text-xs font-semibold text-red-500">{item.expiry}</p>
              </div>
              <button className="text-gray-300 hover:text-red-400 transition-colors shrink-0">
                <Trash2 className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Ingredient Button */}
        <Link
          href="/scan"
          className="flex items-center justify-center gap-2 border-2 border-dashed border-[#3CC63C] rounded-2xl py-4 text-[#3CC63C] font-semibold text-sm hover:bg-green-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add ingredient
        </Link>
      </div>
    </div>
  );
}
