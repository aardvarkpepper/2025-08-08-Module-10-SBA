import { FavoriteContext } from "../contexts/contexts";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const FavoritesProvider = ({ children }: React.PropsWithChildren) => {
  const [favoriteIDSet, setFavoriteIDSet] = useLocalStorage('favoriteRecipes', {});

  const addRecipe = (recipeID: string, recipeDescription: string) => {
    setFavoriteIDSet((prev: any) => {
      return {...prev, [recipeID]: recipeDescription};
    });
  };

  const removeRecipe = (recipeID: string) => {
    setFavoriteIDSet(prev => {
      const tempSet = {...prev};
      delete (tempSet as any)[recipeID];
      return tempSet;
    })
  };

  const isListedInFavorites = (recipeID: string) => {
    return !!(favoriteIDSet as any)[recipeID];
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