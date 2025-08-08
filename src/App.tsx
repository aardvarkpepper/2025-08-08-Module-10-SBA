import './App.css';
import { FavoritesProvider } from './providers/FavoritesProvider';

/**
 * 
 * Use the useState and useEffect hooks to fetch and display data from the API.
Your application should manage loading and error states gracefully, displaying appropriate UI indicators to the user (e.g., a loading spinner, an error message).

useFetch (or similar): A generic custom hook for handling data fetching logic. It should manage the data, loading state, and error state. This hook will be used throughout your application to communicate with the API.
useLocalStorage: A custom hook to synchronize a piece of state with the browser’s localStorage. This will be used to persist the user’s list of favorite recipes.

Create a FavoritesContext to manage the user’s list of favorite recipes globally.
The context must provide:
A list of favorite recipe IDs.
A function to add a recipe to favorites.
A function to remove a recipe from favorites.
A function to check if a recipe is already in favorites.
This context should use your useLocalStorage hook internally to persist the favorites list across browser sessions.

Home Page (/):
Displays a grid or list of all available recipe categories fetched from the API.
Each category should be a link that navigates to its respective category page.
Category Page (/category/[categoryName]):
A dynamic route that displays all recipes belonging to the category specified in the URL (e.g., /category/Seafood).
Each recipe shown should be a link to its detailed recipe page.
Recipe Detail Page (/recipe/[recipeId]):
A dynamic route that fetches and displays the full details for a single recipe (image, ingredients, instructions, etc.).
This page must include a button to “Add to Favorites” or “Remove from Favorites”. The button’s state and action should be handled by your FavoritesContext.
Favorites Page (/favorites):
Displays a list of all recipes that the user has marked as a favorite.
If the user has no favorites, this page should display a message prompting them to browse and add some.
Search Functionality:
A search bar, likely in a shared Navbar, that allows users to search for recipes by name.
Submitting a search should navigate the user to a search results page (e.g., /search?query=Arrabiata). This page will display the results of the search query.

Create reusable, well-styled components (e.g., RecipeCard, Navbar, Spinner, ErrorMessage).
The application should be visually appealing and responsive. Use of a CSS framework, CSS-in-JS, or CSS Modules is up to you.

TheMealDB API Endpoints
The following endpoints are available for use, but are only examples. You will need to explore the API documentation  and use the endpoints that best fit the needs of your application.

List all categories: https://www.themealdb.com/api/json/v1/1/categories.php
Filter by category: https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
Lookup full recipe details by ID: https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
Search meal by name: https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

Focus on deliverables, or whatever it's called when writing one bit of code at a time where results can be visualized.
 */

function App() {

  return (
    <FavoritesProvider>
      <div className='dark'>

      </div>
    </FavoritesProvider>
  )
}

export default App;
