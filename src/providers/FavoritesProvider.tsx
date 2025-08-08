import { useState } from "react";
import { FavoriteContext } from "../contexts/contexts";
import { useLocalStorage } from "../hooks/useLocalStorage";

// export const FavoriteContext = createContext<FavoritesContextType>({
//   recipeIDArray: [],
//   addRecipe: (recipeID: string) => {},
//   removeRecipe: (recipeID: string) => {},
//   isListedInFavorites: (recipeId: string) => false
// });

export const FavoritesProvider = ({ children }: React.PropsWithChildren) => {
  const [favoriteIDSet, setFavoriteIDSet] = useLocalStorage('favoriteRecipes', {});

  console.log(favoriteIDSet);
  console.log(setFavoriteIDSet);

  // const addRecipe = (recipeID: string) => {
  //   setFavoriteIDSet((prev: any) => {
  //     return {...prev, recipeID: true};
  //   });
  // };

  // const removeRecipe = (recipeID: string) => {
  //   setFavoriteIDSet(prev => {
  //     const tempSet = new Set<string>([...prev]);
  //     tempSet.delete(recipeID);
  //     return tempSet;
  //   })
  // };

  // const isListedInFavorites = (recipeID: string) => {
  //   return favoriteIDSet.has(recipeID);
  // }

  const addRecipe = (recipeID: string) => { };
  const removeRecipe = (recipeID: string) => { };
  const isListedInFavorites = (recipeID: string) => false;

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