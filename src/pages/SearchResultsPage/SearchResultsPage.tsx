import { useParams } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../../contexts/contexts";
import { useFetch } from "../../hooks/useFetch";

export const SearchResultsPage = () => {

  const { recipeName } = useParams();
  const { favoriteIDSet, addRecipe, removeRecipe, isListedInFavorites } = useContext(FavoriteContext);
  const { data, loading, error } = useFetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`);

  if (loading) {
    console.log('loading', data, loading, error);
    return <span className='loader'></span>
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!data) {
    return <div>No data found.</div>;
  } else if (data.meals === null) {
    return <div>The search term {recipeName} could not be found.</div>
  }
  // else if (!data) {
  //   return <div>Data or categories not found.</div>;
  // }

  let mealRef = data.meals[0];
  // console.log(`RDP`, JSON.stringify(data));
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
    // <div>
    //   <h2>{mealRef.strMeal}</h2>
    //   {isListedInFavorites(mealRef.idMeal) ? <button onClick={() => removeRecipe(mealRef.idMeal)}>Remove from Favorites</button> : <button onClick={() => addRecipe(mealRef.idMeal, mealRef.strMeal)}>Add to Favorites</button>}
    //   <div>Category: {mealRef.strCategory}</div>
    //   <div>Area: {mealRef.strArea}</div>
    //   <div>Instructions: {mealRef.strInstructions}</div>
    //   <img src={mealRef.strMealThumb} alt={mealRef.strMeal} />
    //   <div>Tags: {mealRef.strTags}</div>
    //   <iframe width="420" height="315"
    //     src={`https://www.youtube.com/embed/${mealRef.strYoutube.slice(32)}`}>
    //   </iframe>
    //   <ul>
    //     {ingredientArray.map(ingredient => ingredient[0] ? <li key={`${mealRef.idMeal}-${ingredient[0]}`}>{ingredient[0]}: {ingredient[1]}</li> : null)}
    //   </ul>
    // </div>
  )
}

/**
 * {
"meals": [
{
"idMeal": "52771",
"strMeal": "Spicy Arrabiata Penne",
"strMealAlternate": null,
"strCategory": "Vegetarian",
"strArea": "Italian",
"strInstructions": "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.",
"strMealThumb": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
"strTags": "Pasta,Curry",
"strYoutube": "https://www.youtube.com/watch?v=1IszT_guI08",
"strIngredient1": "penne rigate",
"strIngredient2": "olive oil",
"strIngredient3": "garlic",
"strIngredient4": "chopped tomatoes",
"strIngredient5": "red chilli flakes",
"strIngredient6": "italian seasoning",
"strIngredient7": "basil",
"strIngredient8": "Parmigiano-Reggiano",
"strIngredient9": "",
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
"strMeasure1": "1 pound",
"strMeasure2": "1/4 cup",
"strMeasure3": "3 cloves",
"strMeasure4": "1 tin ",
"strMeasure5": "1/2 teaspoon",
"strMeasure6": "1/2 teaspoon",
"strMeasure7": "6 leaves",
"strMeasure8": "sprinkling",
"strMeasure9": "",
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