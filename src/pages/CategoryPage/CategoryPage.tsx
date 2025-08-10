import { useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { FavoriteContext } from "../../contexts/contexts";

export const CategoryPage = () => {

  let { categoryName } = useParams();
  const { addRecipe, removeRecipe, isListedInFavorites } = useContext(FavoriteContext);
  const { data, loading, error } = useFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
  if (loading) {
    return <span className='loader'></span>
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!data) {
    return <span className='loader'></span>;
  }
  // else if (!data) {
  //   return <div>Data or categories not found.</div>;
  // }

  return (
    <div>
      <h2>Category: {categoryName}</h2>
      <ul className='container-wrap'>
        {(data as any).meals.map((meal: any) => {
          return (
            <li key={`meal-${meal.idMeal}`} className='nobullet border-container'>
              <div className='flexh jc-spacebetween ai-center'>
                <h2><Link to={`/recipe/${meal.idMeal}`}>{meal.strMeal}</Link></h2>
                {isListedInFavorites(meal.idMeal) ? <button onClick={() => removeRecipe(meal.idMeal)}>-</button> : <button onClick={() => addRecipe(meal.idMeal, meal.strMeal)}>+</button>}
              </div>
              {meal.strMealThumb ? <div><img className='block-center' src={meal.strMealThumb} alt={meal.strMeal} /></div> : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}