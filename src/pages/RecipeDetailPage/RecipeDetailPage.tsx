import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useContext } from 'react';
import { FavoriteContext } from '../../contexts/contexts';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const RecipeDetailPage = () => {

  let { recipeId } = useParams();

  const { favoriteIDSet, addRecipe, removeRecipe, isListedInFavorites } = useContext(FavoriteContext);

  const { data, loading, error } = useFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);

  console.log('RDP attempting fetch', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)

  if (loading) {
    console.log('RecipeDetailPage loading')
    return <div>Loading</div>;
  }
  if (error) {
    console.log('RecipeDetailPage error')
    console.log(`RecipeDetailPage data: ${JSON.parse(data)}`);
    return <div>Error: {error.message}</div>;
  }
  if (!data?.meals) {
    console.log('RecipeDetailPage data or meals not found.')
    return <div>Data or recipe detail not found.</div>;
  }

  const mealRef = data.meals[0];
  console.log(`RDP`, JSON.stringify(data));
  const ingredientArray = [];
  for (let i = 1; i <= 20; i++) {
    ingredientArray.push([mealRef[`strIngredient${i}`], mealRef[`strMeasure${i}`]]);
  }

  return (
    <div>
      <h2>{mealRef.strMeal}</h2>
      {isListedInFavorites(mealRef.idMeal) ? <button onClick={() => removeRecipe(mealRef.idMeal)}>Remove from Favorites</button>: <button onClick={()=>addRecipe(mealRef.idMeal, mealRef.strMeal)}>Add to Favorites</button>}
      <div>Category: {mealRef.strCategory}</div>
      <div>Area: {mealRef.strArea}</div>
      <div>Instructions: {mealRef.strInstructions}</div>
      <img src={mealRef.strMealThumb} alt={mealRef.strMeal} />
      <div>Tags: {mealRef.strTags}</div>
      <iframe width="420" height="315"
        src={`https://www.youtube.com/embed/${mealRef.strYoutube.slice(32)}`}>
      </iframe>
      <ul>
        {ingredientArray.map(ingredient => ingredient[0] ? <li key={`${mealRef.idMeal}-${ingredient[0]}`}>{ingredient[0]}: {ingredient[1]}</li> : null)}
      </ul>
    </div>
  )
}

// https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
// .meals[0]
/**
 * strMeal: title
 * strMealAlternate:  null?  maybe?
 * strCategory: Chicken
 * strArea: Japanese
 * strInstructions: thingy.  Note that \r and \n.
 * strMealThumb:  https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg
 * strTags:  Meat, Casserole
 * strYoutube:  https://www.youtube.com/watch?v=4aZr5hZXP_s
 * strIngredient1 . . . 20
 * strMeasure1....20 (corresponds above)
 * "strSource": null,
"strImageSource": null,
"strCreativeCommonsConfirmed": null,
"dateModified": null
 * 
 * {
"meals": [
{
"idMeal": "52772",
"strMeal": "Teriyaki Chicken Casserole",
"strMealAlternate": null,
"strCategory": "Chicken",
"strArea": "Japanese",
"strInstructions": "Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\r\nMeanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r\nPlace the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\r\n*Meanwhile, steam or cook the vegetables according to package directions.\r\nAdd the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!",
"strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
"strTags": "Meat,Casserole",
"strYoutube": "https://www.youtube.com/watch?v=4aZr5hZXP_s",
"strIngredient1": "soy sauce",
"strIngredient2": "water",
"strIngredient3": "brown sugar",
"strIngredient4": "ground ginger",
"strIngredient5": "minced garlic",
"strIngredient6": "cornstarch",
"strIngredient7": "chicken breasts",
"strIngredient8": "stir-fry vegetables",
"strIngredient9": "brown rice",
"strIngredient10": "",
"strIngredient11": "",
"strIngredient12": "",
"strIngredient13": "",
"strIngredient14": "",
"strIngredient15": "",
"strIngredient16": null,
"strIngredient17": null,
"strIngredient18": null,
"strIngredient19": null,
"strIngredient20": null,
"strMeasure1": "3/4 cup",
"strMeasure2": "1/2 cup",
"strMeasure3": "1/4 cup",
"strMeasure4": "1/2 teaspoon",
"strMeasure5": "1/2 teaspoon",
"strMeasure6": "4 Tablespoons",
"strMeasure7": "2",
"strMeasure8": "1 (12 oz.)",
"strMeasure9": "3 cups",
"strMeasure10": "",
"strMeasure11": "",
"strMeasure12": "",
"strMeasure13": "",
"strMeasure14": "",
"strMeasure15": "",
"strMeasure16": null,
"strMeasure17": null,
"strMeasure18": null,
"strMeasure19": null,
"strMeasure20": null,
"strSource": null,
"strImageSource": null,
"strCreativeCommonsConfirmed": null,
"dateModified": null
}
]
}
 */