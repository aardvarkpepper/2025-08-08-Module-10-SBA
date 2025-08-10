import { useContext } from "react";
import { FavoriteContext } from "../../contexts/contexts";
import trashIcon from "../../assets/trashIcon.png";

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
      {favoriteRecipes.map(([key, value]) => <li key={key} className='nth-child width-special flexh jc-spacebetween ai-center border-container-small'> {value as any}
        <button className='trash-icon-button ai-center' onClick={() => removeRecipe(key)}>
          <img src={trashIcon} alt='Trash can icon' />
          </button>
          </li>)}
      </ul>
    </div>
  )
}