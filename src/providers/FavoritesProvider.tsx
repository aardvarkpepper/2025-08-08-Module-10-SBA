import { useState } from "react";
import { FavoriteContext } from "../contexts/contexts";

// export const FavoriteContext = createContext<FavoritesContextType>({
//   recipeIDArray: [],
//   addRecipe: (recipeID: string) => {},
//   removeRecipe: (recipeID: string) => {},
//   isListedInFavorites: (recipeId: string) => false
// });

export const FavoritesProvider = ({ children }: React.PropsWithChildren) => {
  const favoriteSetInit = new Set<string>();
  const [favoriteIDSet, setFavoriteIDSet] = useState<Set<string>>(favoriteSetInit);
  
  const addRecipe = (recipeID: string) => {
    setFavoriteIDSet(prev => {
      const tempSet = new Set<string>([...prev, recipeID]);
      return tempSet;
    });
  };

  const removeRecipe = (recipeID: string) => {
    setFavoriteIDSet(prev => {
      const tempSet = new Set<string>([...prev]);
      tempSet.delete(recipeID);
      return tempSet;
    })
  };

  const isListedInFavorites = (recipeID: string) => {
    return favoriteIDSet.has(recipeID);
  }

  const FavoriteContextValue = {
    favoriteIDSet,
    addRecipe,
    removeRecipe,
    isListedInFavorites
  }

  return (
    <FavoriteContext value={FavoriteContextValue}>
      {children}
    </FavoriteContext>
  )
}