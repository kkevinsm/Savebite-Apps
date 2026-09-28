"use client";

import { useState } from "react";
import { ChevronRight, LogOut, BookmarkCheck, Clock, Trash2, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRecipes } from "@/context/RecipesContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { logout } = useAuth();
  const { savedRecipes, removeRecipe } = useRecipes();
  const { lang, setLang, t } = useLanguage();
  const router = useRouter();
  const [expiryReminder, setExpiryReminder] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50">

      {/* ── Green Header ────────────────────────────── */}
      <div className="bg-[#3CC63C] px-5 pt-14 pb-8 rounded-b-[40px]">
        <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-1">
          {t.profile_account_label}
        </p>
        <h1 className="text-3xl font-bold text-white mb-5">{t.profile_title}</h1>

        {/* User Card */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#F5E6C8] flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-gray-700">U</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-sm">User</h2>
            <p className="text-xs text-gray-500">user@savebite.app</p>
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────── */}
      <div className="px-5 pt-6 pb-6 flex flex-col gap-6">

        {/* PREFERENCES */}
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-3">
            {t.profile_preferences}
          </p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* Expiry Reminders toggle */}
            <div className="flex justify-between items-center px-4 py-4 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">{t.profile_expiry_title}</h3>
                <p className="text-xs text-gray-500">{t.profile_expiry_desc}</p>
              </div>
              <button
                id="expiry-toggle"
                onClick={() => setExpiryReminder(!expiryReminder)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex items-center shrink-0 ${
                  expiryReminder ? "bg-[#3CC63C]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full shadow absolute transition-transform duration-200 ${
                    expiryReminder ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Help Center */}
            <button
              id="help-center-btn"
              onClick={() => setShowHelpModal(true)}
              className="w-full flex justify-between items-center px-4 py-4 border-b border-gray-100"
            >
              <div className="text-left">
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">{t.profile_help_title}</h3>
                <p className="text-xs text-gray-500">{t.profile_help_desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.8} />
            </button>

            {/* Language Toggle */}
            <div className="flex justify-between items-center px-4 py-4">
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">{t.profile_lang_title}</h3>
                <p className="text-xs text-gray-500">{t.profile_lang_desc}</p>
              </div>
              <div className="flex bg-gray-50 rounded-lg p-1 shrink-0">
                <button
                  onClick={() => setLang('id')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${lang === 'id' ? 'bg-white text-[#3CC63C] shadow-sm' : 'text-gray-400'}`}
                >
                  ID
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${lang === 'en' ? 'bg-white text-[#3CC63C] shadow-sm' : 'text-gray-400'}`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAVORITE RECIPES */}
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-3">
            {t.profile_fav_recipes}
          </p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {savedRecipes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <BookmarkCheck className="w-8 h-8 text-gray-300 mb-2" />
                <p className="text-sm text-gray-400">Belum ada resep tersimpan.</p>
              </div>
            ) : (
              savedRecipes.map((recipe) => (
                <div key={recipe.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-800 truncate">{recipe.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                      <Clock className="w-3 h-3 mr-1" />{recipe.duration}
                    </div>
                  </div>
                  <button
                    onClick={() => removeRecipe(recipe.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SIGN OUT */}
        <button
          id="signout-btn"
          onClick={() => setShowSignOutConfirm(true)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-red-200 text-red-500 font-bold text-sm hover:bg-red-50 active:scale-95 transition-all"
        >
          <LogOut className="w-4 h-4" />
          {t.profile_signout}
        </button>
      </div>

      {/* ── Help Center Modal ─────────────────────── */}
      {showHelpModal && (
        <div className="absolute inset-0 z-[60] bg-black/50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl p-6 pb-10 max-h-[80%] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-900">{t.profile_help_modal_title}</h2>
              <button onClick={() => setShowHelpModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t.profile_help_modal_subtitle}</p>
            {[
              { title: "🥩 Daging Segar", tip: "Simpan di freezer dalam wadah kedap udara. Tahan 3–4 hari di kulkas, atau 3 bulan di freezer." },
              { title: "🥦 Sayuran Segar", tip: "Bungkus dengan tisu dapur dan simpan di laci bawah kulkas. Jangan cuci sebelum disimpan." },
              { title: "🥛 Produk Susu", tip: "Simpan di rak tengah kulkas, bukan di pintu. Suhu lebih stabil di rak tengah." },
              { title: "🍳 Makanan Matang", tip: "Simpan di wadah tertutup dalam kulkas. Konsumsi dalam 3 hari untuk keamanan terbaik." },
              { title: "🥚 Telur", tip: "Simpan di kardus aslinya di rak kulkas, bukan di pintu. Tahan hingga 3–5 minggu." },
            ].map((item) => (
              <div key={item.title} className="mb-4 pb-4 border-b border-gray-100 last:border-0">
                <h3 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Sign Out Confirmation ─────────────────── */}
      {showSignOutConfirm && (
        <div className="absolute inset-0 z-[60] bg-black/50 flex items-center justify-center px-6">
          <div className="w-full bg-white rounded-3xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 text-center">{t.profile_signout_confirm_title}</h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              {t.profile_signout_confirm_desc}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm"
              >
                {t.profile_cancel}
              </button>
              <button
                id="confirm-signout-btn"
                onClick={handleLogout}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-bold text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
