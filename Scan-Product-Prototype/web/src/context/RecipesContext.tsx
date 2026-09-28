"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SavedRecipe {
  id: string;
  title: string;
  duration: string;
  image: string;
  savedAt: string;
}

interface RecipesContextType {
  savedRecipes: SavedRecipe[];
  saveRecipe: (recipe: SavedRecipe) => void;
  removeRecipe: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const RecipesContext = createContext<RecipesContextType | null>(null);

export function RecipesProvider({ children }: { children: ReactNode }) {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sb_recipes");
      if (raw) setSavedRecipes(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (recipes: SavedRecipe[]) => {
    setSavedRecipes(recipes);
    localStorage.setItem("sb_recipes", JSON.stringify(recipes));
  };

  const saveRecipe = (recipe: SavedRecipe) => {
    if (!savedRecipes.find((r) => r.id === recipe.id)) {
      persist([...savedRecipes, recipe]);
    }
  };

  const removeRecipe = (id: string) => {
    persist(savedRecipes.filter((r) => r.id !== id));
  };

  const isSaved = (id: string) => savedRecipes.some((r) => r.id === id);

  return (
    <RecipesContext.Provider value={{ savedRecipes, saveRecipe, removeRecipe, isSaved }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error("useRecipes must be used within RecipesProvider");
  return ctx;
}
