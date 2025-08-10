import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useContext } from 'react';
import { FavoriteContext } from '../../contexts/contexts';

export const RecipeDetailPage = () => {

  let { recipeId } = useParams();

  const { addRecipe, removeRecipe, isListedInFavorites } = useContext(FavoriteContext);

  const { data, loading, error } = useFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);

  //console.log('RDP attempting fetch', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
  if (loading) {
    return <span className='loader'></span>
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!data) {
    return <span className='loader'></span>;
  } else if (data.meals === null) {
    return <div>The recipe could not be found.</div>
  }
  // else if (!data) {
  //   return <div>Data or categories not found.</div>;
  // }

  const mealRef = data.meals[0];
  const ingredientArray = [];
  for (let i = 1; i <= 20; i++) {
    ingredientArray.push([mealRef[`strIngredient${i}`], mealRef[`strMeasure${i}`]]);
  }

  return (
    <div className='border-container'>
      <div className='flexh jc-spacebetween'>
        <h2>{mealRef.strMeal}</h2>
        {isListedInFavorites(mealRef.idMeal) ? <button onClick={() => removeRecipe(mealRef.idMeal)}>Remove from Favorites</button> : <button onClick={() => addRecipe(mealRef.idMeal, mealRef.strMeal)}>Add to Favorites</button>}
      </div>
      <div className='fontheavy'>Category: {mealRef.strCategory}</div>
      <div className='fontheavy'>Area: {mealRef.strArea}</div>
      {mealRef.strMealThumb ? <img className='img-float' src={mealRef.strMealThumb} alt={mealRef.strMeal} /> : null}
      {mealRef.strTags ? <div>Tags: {mealRef.strTags}</div> : null}
      <div><span>Instructions:</span><span>&nbsp;&nbsp;&nbsp;{mealRef.strInstructions}</span></div>
      <div className='clear'></div>
      <div>
        <div className='img-float-right video-container'>
          {mealRef.strYoutube ? <iframe width="420" height="315"
            src={`https://www.youtube.com/embed/${mealRef.strYoutube.slice(32)}`}>
          </iframe> : null}
        </div>
        <ul className='border-container padding-plus'>
          {ingredientArray.map(ingredient => ingredient[0] ? <li key={`${mealRef.idMeal}-${ingredient[0]}`}>{ingredient[0]}: {ingredient[1]}</li> : null)}
        </ul>
      </div>
    </div>
  )
}