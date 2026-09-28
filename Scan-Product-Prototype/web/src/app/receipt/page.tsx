"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UtensilsCrossed, BookmarkCheck, Bookmark } from "lucide-react";
import { useRecipes } from "@/context/RecipesContext";
import { useLanguage } from "@/context/LanguageContext";

const RECIPE = {
  id: "tumis-sosis-asam-manis",
  title: "Tumis Sosis Asam Manis",
  duration: "15m",
  image: "/assets/0_tumis-sosis-asam-manis_1790397164033.png",
  savedAt: new Date().toISOString(),
};

export default function ReceiptPage() {
  const router = useRouter();
  const { saveRecipe, removeRecipe, isSaved } = useRecipes();
  const { t } = useLanguage();
  const saved = isSaved(RECIPE.id);
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = () => {
    if (saved) {
      removeRecipe(RECIPE.id);
    } else {
      saveRecipe(RECIPE);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white">

      {/* ── Hero Image ──────────────────────────────── */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={RECIPE.image}
          alt={RECIPE.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
          <h1 className="text-white text-xl font-bold drop-shadow-lg leading-tight">
            {RECIPE.title}
          </h1>
          <button
            onClick={handleSave}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            {saved
              ? <BookmarkCheck className="w-5 h-5 text-[#3CC63C]" />
              : <Bookmark className="w-5 h-5 text-white" />
            }
          </button>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div className="px-5 pt-6">

        {/* Ingredients Checklist */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-bold text-gray-900 text-xl">{t.recipe_ingredients}</h2>
          <UtensilsCrossed className="w-6 h-6 text-red-400 mt-1" strokeWidth={1.8} />
        </div>

        <ul className="space-y-1 mb-6">
          {[
            "(250g) Sosis Sapi",
            "3sdm jagung manis pipil rebus",
            "1/2 buah bawang bombay, iris memanjang",
          ].map((item) => (
            <li key={item} className="text-sm text-gray-700">
              {item}
            </li>
          ))}
        </ul>

        {/* Step-by-step Guide */}
        <h2 className="font-bold text-gray-900 text-xl mb-4">{t.recipe_steps}</h2>
        <div className="space-y-4 mb-8">
          {[
            "Tumis bawang merah bawang putih hingga harum.",
            "Tambahkan bawang bombay dan paprika. Tumis hingga layu.",
            "Masukkan sosis sapi. Masak hingga sosis matang.",
            "Tambahkan suwiran daging sapi rebus dan jagung manis. Tumis sebentar.",
            "Tambahkan air, garam, gula, kaldu sapi, lada bubuk. Lalu aduk merata. Cicipi rasa.",
            "Tunggu hingga mendidih dan air menyusut sedikit. Angkat dan sajikan.",
          ].map((step, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>

        {/* Save Recipe Button */}
        <button
          id="save-recipe-btn"
          onClick={handleSave}
          className={`w-full py-4 rounded-2xl font-bold text-base shadow-md active:scale-95 transition-all mb-6 flex items-center justify-center gap-2
            ${saved
              ? "bg-gray-100 text-gray-600 border border-gray-200"
              : "bg-[#3CC63C] text-white hover:bg-[#2DB82D]"
            }`}
        >
          {justSaved ? (
            <>
              <BookmarkCheck className="w-5 h-5" />
              {t.recipe_saved}
            </>
          ) : saved ? (
            <>
              <BookmarkCheck className="w-5 h-5 text-[#3CC63C]" />
              {t.recipe_remove}
            </>
          ) : (
            t.recipe_save
          )}
        </button>
      </div>
    </div>
  );
}
