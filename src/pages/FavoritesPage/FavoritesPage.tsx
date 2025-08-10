import { useContext } from "react";
import { FavoriteContext } from "../../contexts/contexts";

export const FavoritesPage = () => {
  const { favoriteIDSet, addRecipe, removeRecipe, isListedInFavorites } = useContext(FavoriteContext);

  const favoriteRecipes = Object.entries(favoriteIDSet);

  if (favoriteRecipes.length === 0) {
    return <div>You have not marked any recipes as favorites yet!  Would you like to browse and add some?</div>
  }

  return (
    <div>
      <h2>Favorites Page</h2>
      <ul>
      {favoriteRecipes.map(([key, value]) => <li key={key}>{value as any}<button onClick={() => removeRecipe(key)}>Remove From Favorites</button></li>)}
      </ul>
    </div>
  )
}