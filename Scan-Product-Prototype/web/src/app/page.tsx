"use client";

import { useState } from 'react';
import { Bell, Camera, X, Info, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const notifications = [
    {
      id: 1,
      title: "Sosis Sapi hampir kedaluwarsa!",
      message: "Sebaiknya segera diolah sebelum 18 September 2026.",
      type: "alert",
      time: "2 jam yang lalu",
      unread: true
    },
    {
      id: 2,
      title: "Resep baru tersedia",
      message: "Cek resep Tumis Sosis Asam Manis yang cocok dengan bahanmu.",
      type: "info",
      time: "5 jam yang lalu",
      unread: true
    }
  ];

  const handleOpenNotifications = () => {
    setShowNotifications(true);
    setHasUnread(false);
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50 relative">

      {/* ── Green Header ──────────────────────────────── */}
      <div className="bg-[#3CC63C] px-5 pt-14 pb-32 rounded-b-[48px] relative z-0">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-white">{t.home_greeting}</h1>
          <button 
            onClick={handleOpenNotifications}
            className="p-2 text-white relative hover:bg-white/10 rounded-full transition-colors"
          >
            <Bell className="w-6 h-6" strokeWidth={1.8} />
            {hasUnread && (
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-[#3CC63C] rounded-full"></span>
            )}
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex divide-x divide-gray-100">
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#3CC63C]">3</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{t.home_summary_total}</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-red-500">3</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1 text-center leading-tight">{t.home_summary_urgent}</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-orange-400">1</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1 text-center leading-tight">{t.home_summary_recipe}</span>
          </div>
        </div>
      </div>

      {/* ── Floating Scan Button ───────────────────────── */}
      <div className="-mt-16 flex justify-center mb-6 relative z-10">
        <Link
          href="/scan"
          className="w-32 h-32 rounded-full bg-[#2DB82D] border-[6px] border-white shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform active:scale-95 group"
        >
          <Camera className="w-9 h-9 text-white mb-1 group-active:scale-90 transition-transform" strokeWidth={1.8} />
          <span className="text-white text-[10px] font-bold text-center leading-tight tracking-wide uppercase whitespace-pre-wrap">
            {t.home_scan_btn}
          </span>
        </Link>
      </div>

      {/* ── Urgent to Cook ──────────────────────────── */}
      <div className="px-5 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-900 text-base">{t.home_urgent_title}</h2>
          <Link href="/my-kitchen" className="text-sm font-semibold text-[#3CC63C] hover:text-[#2DB82D]">
            {t.home_view_all}
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar snap-x">
          {/* Item 1 – Sosis Sapi */}
          <div className="bg-white rounded-2xl p-3 min-w-[120px] shadow-sm snap-start flex flex-col items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden mb-2 bg-[#FFF0F0]">
              <img src="/assets/1_sosis_1790397112218.png" alt="Sosis Sapi" className="w-full h-full object-contain" />
            </div>
            <p className="font-semibold text-gray-800 text-xs text-center">Sosis Sapi</p>
            <p className="text-[10px] text-red-500 font-medium text-center mt-0.5 leading-tight">
              {t.home_expired_label}<br />18 Sep 2026
            </p>
          </div>

          {/* Item 2 – Sayur Mix */}
          <div className="bg-white rounded-2xl p-3 min-w-[120px] shadow-sm snap-start flex flex-col items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden mb-2 bg-[#F0FFF0]">
              <img src="/assets/0_sayur-mix_1790397112201.png" alt="Sayur Mix" className="w-full h-full object-contain" />
            </div>
            <p className="font-semibold text-gray-800 text-xs text-center">Sayur Mix</p>
            <p className="text-[10px] text-red-500 font-medium text-center mt-0.5 leading-tight">
              {t.home_expired_label}<br />20 Sep 2026
            </p>
          </div>

          {/* Item 3 – Yogurt */}
          <div className="bg-white rounded-2xl p-3 min-w-[120px] shadow-sm snap-start flex flex-col items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden mb-2 bg-[#F5F0FF]">
              <img src="/assets/2_yogurt_1790397112218.png" alt="Yogurt" className="w-full h-full object-contain" />
            </div>
            <p className="font-semibold text-gray-800 text-xs text-center">Yogurt</p>
            <p className="text-[10px] text-red-500 font-medium text-center mt-0.5 leading-tight">
              {t.home_expired_label}<br />21 Sep 2026
            </p>
          </div>
        </div>
      </div>

      {/* ── Kitchen Summary Card ──────────────────────── */}
      <div className="px-5 pb-6">
        <div className="bg-gray-100 rounded-2xl px-5 py-4 flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">
              {t.home_kitchen_summary}
            </p>
            <p className="text-xs text-gray-500 max-w-[180px] leading-relaxed">
              {t.home_kitchen_desc}
            </p>
          </div>
          <span className="text-sm font-bold text-[#3CC63C] whitespace-nowrap">3 items</span>
        </div>
      </div>

      {/* ── Notification Dropdown / Modal ─────────────────── */}
      {showNotifications && (
        <div className="absolute inset-0 z-[60] flex flex-col">
          <div 
            className="absolute inset-0 bg-black/40 transition-opacity" 
            onClick={() => setShowNotifications(false)}
          />
          <div className="relative mt-20 mx-4 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-4 duration-200 z-10 max-h-[70%]">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{t.home_notif_title}</h2>
              <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full p-1.5">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-4 border-b border-gray-50 flex gap-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'alert' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                    {notif.type === 'alert' ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 mb-0.5">{notif.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-1">{notif.message}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
