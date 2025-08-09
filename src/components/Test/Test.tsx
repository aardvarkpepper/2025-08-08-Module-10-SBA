import { useContext } from 'react';
import { FavoriteContext } from '../../contexts/contexts';

export const Test = () => {

  const { favoriteIDSet, addRecipe, removeRecipe, isListedInFavorites } = useContext(FavoriteContext);

  let checkItem = "CheckItem default";

  // Note:  State does not update this output, so though the console.log correctly updates, the text in the div does not.
  const handleCheck = () => {
    console.log('checkItem invoked', isListedInFavorites("ster"));
    checkItem = (isListedInFavorites("ster")) ? "Yes it is in" : "No it is not in";
  }

  const handleClear = () => {
    localStorage.removeItem("favoriteRecipes");
  }

  const handleNuke = () => {
    localStorage.clear();
  }
  return (
    <div>
      <div>{JSON.stringify(favoriteIDSet)}</div>
      <div>{checkItem}</div>
      <button onClick={(() => addRecipe('ham'))}>Add ham</button>
      <button onClick={(() => addRecipe('ster'))}>Add ster</button>
      <button onClick={(() => removeRecipe('ster'))}>Remove ster</button>
      <button onClick={(() => handleCheck())}>Is ster</button>
      <button onClick={() => handleClear()}>Clear Data</button>
      <button onClick={() => handleNuke()}>Nuke Data</button>
    </div>
  )
}