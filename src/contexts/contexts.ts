import { createContext } from "react";
import type { FavoritesContextType } from "../types";

export const FavoriteContext = createContext<FavoritesContextType>({
  favoriteIDSet: {},
  addRecipe: (recipeID: string) => {},
  removeRecipe: (recipeID: string) => {},
  isListedInFavorites: (recipeId: string) => false
});