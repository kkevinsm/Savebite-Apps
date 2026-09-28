"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "id";

type Dictionary = {
  // Bottom Nav
  nav_home: string;
  nav_kitchen: string;
  nav_receipt: string;
  nav_profile: string;

  // Home
  home_greeting: string;
  home_summary_total: string;
  home_summary_urgent: string;
  home_summary_recipe: string;
  home_urgent_title: string;
  home_view_all: string;
  home_notif_title: string;
  home_scan_btn: string;
  home_expired_label: string;
  home_kitchen_summary: string;
  home_kitchen_desc: string;

  // Profile
  profile_title: string;
  profile_account_label: string;
  profile_preferences: string;
  profile_expiry_title: string;
  profile_expiry_desc: string;
  profile_help_title: string;
  profile_help_desc: string;
  profile_lang_title: string;
  profile_lang_desc: string;
  profile_fav_recipes: string;
  profile_signout: string;
  profile_no_recipes: string;
  profile_help_modal_title: string;
  profile_help_modal_subtitle: string;
  profile_signout_confirm_title: string;
  profile_signout_confirm_desc: string;
  profile_cancel: string;

  // My Kitchen
  kitchen_label: string;
  kitchen_title: string;
  kitchen_subtitle: string;
  kitchen_all_items: string;
  kitchen_sort: string;
  kitchen_expired_in: string;
  kitchen_days: string;

  // Scan
  scan_active: string;
  scan_desc: string;
  scan_mode: string;
  scan_mode_single: string;
  scan_mode_receipt: string;

  // Receipt (Recipe)
  recipe_ingredients: string;
  recipe_steps: string;
  recipe_save: string;
  recipe_saved: string;
  recipe_remove: string;
};

const dictionaries: Record<Language, Dictionary> = {
  en: {
    nav_home: "Home",
    nav_kitchen: "My Kitchen",
    nav_receipt: "Receipt",
    nav_profile: "Profile",

    home_greeting: "Hello, User!",
    home_summary_total: "Total Items",
    home_summary_urgent: "Expiring Soon",
    home_summary_recipe: "Recipes",
    home_urgent_title: "Urgent to Cook",
    home_view_all: "View All",
    home_notif_title: "Notifications",
    home_scan_btn: "Scan Food\nIngredients",
    home_expired_label: "Expired :",
    home_kitchen_summary: "Kitchen Summary",
    home_kitchen_desc: "Keep your ingredients visible, fresh, and ready to cook.",

    profile_title: "Profile",
    profile_account_label: "Your Account",
    profile_preferences: "Preferences",
    profile_expiry_title: "Expiry reminders",
    profile_expiry_desc: "Get notified before ingredients expire",
    profile_help_title: "Help center",
    profile_help_desc: "Tips for storing food safely",
    profile_lang_title: "Language",
    profile_lang_desc: "Change application language",
    profile_fav_recipes: "Favorite Recipes",
    profile_signout: "Sign Out",
    profile_no_recipes: "No saved recipes yet.",
    profile_help_modal_title: "Help Center",
    profile_help_modal_subtitle: "Food Storage Tips",
    profile_signout_confirm_title: "Sign Out?",
    profile_signout_confirm_desc: "Are you sure you want to sign out?",
    profile_cancel: "Cancel",

    kitchen_label: "Your Ingredients",
    kitchen_title: "My Kitchen",
    kitchen_subtitle: "3 ingredients saved · 3 need attention",
    kitchen_all_items: "All ingredients",
    kitchen_sort: "Sort by expiry",
    kitchen_expired_in: "Expired in",
    kitchen_days: "days!",

    scan_active: "Camera active",
    scan_desc: "Scan a product's front label or receipt to log ingredients.",
    scan_mode: "Mode:",
    scan_mode_single: "Single Product",
    scan_mode_receipt: "Receipt",

    recipe_ingredients: "Ingredients Checklist",
    recipe_steps: "Step-by-step Guide",
    recipe_save: "Save recipe",
    recipe_saved: "Saved to Profile!",
    recipe_remove: "Remove from Favorites",
  },
  id: {
    nav_home: "Beranda",
    nav_kitchen: "Dapurku",
    nav_receipt: "Resep",
    nav_profile: "Profil",

    home_greeting: "Halo, User!",
    home_summary_total: "Total Bahan",
    home_summary_urgent: "Segera Diolah",
    home_summary_recipe: "Resep Baru",
    home_urgent_title: "Segera Dimasak",
    home_view_all: "Lihat Semua",
    home_notif_title: "Notifikasi",
    home_scan_btn: "Scan Bahan\nMakanan",
    home_expired_label: "Kedaluwarsa :",
    home_kitchen_summary: "Ringkasan Dapur",
    home_kitchen_desc: "Pantau bahan makananmu, tetap segar dan siap dimasak.",

    profile_title: "Profil",
    profile_account_label: "Akun Anda",
    profile_preferences: "Pengaturan",
    profile_expiry_title: "Pengingat kedaluwarsa",
    profile_expiry_desc: "Dapatkan notifikasi sebelum bahan basi",
    profile_help_title: "Pusat Bantuan",
    profile_help_desc: "Tips aman menyimpan makanan",
    profile_lang_title: "Bahasa",
    profile_lang_desc: "Ubah bahasa aplikasi",
    profile_fav_recipes: "Resep Favorit",
    profile_signout: "Keluar",
    profile_no_recipes: "Belum ada resep tersimpan.",
    profile_help_modal_title: "Pusat Bantuan",
    profile_help_modal_subtitle: "Tips Menyimpan Makanan",
    profile_signout_confirm_title: "Keluar?",
    profile_signout_confirm_desc: "Kamu yakin ingin keluar dari akun ini?",
    profile_cancel: "Batal",

    kitchen_label: "Bahan Makananmu",
    kitchen_title: "Dapurku",
    kitchen_subtitle: "3 bahan disimpan · 3 perlu perhatian",
    kitchen_all_items: "Semua bahan",
    kitchen_sort: "Urutkan",
    kitchen_expired_in: "Kedaluwarsa",
    kitchen_days: "hari lagi!",

    scan_active: "Kamera aktif",
    scan_desc: "Scan label depan produk atau struk belanja.",
    scan_mode: "Mode:",
    scan_mode_single: "Satu Produk",
    scan_mode_receipt: "Struk",

    recipe_ingredients: "Daftar Bahan",
    recipe_steps: "Langkah-langkah",
    recipe_save: "Simpan resep",
    recipe_saved: "Tersimpan ke Profil!",
    recipe_remove: "Hapus dari Favorit",
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("id"); // Default ID

  useEffect(() => {
    const saved = localStorage.getItem("sb_lang") as Language;
    if (saved === "en" || saved === "id") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("sb_lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
