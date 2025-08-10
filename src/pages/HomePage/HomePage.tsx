import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

export const HomePage = () => {

  const { data, loading, error } = useFetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
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
      <ul className='noBullet'>
        {(data as any).categories.map((category: any) => {
          return (
            <li key={`category-${category.idCategory}`} className='nobullet border-container height-special'>
                  <h2><Link to={`/category/${category.strCategory}`}>{category.strCategory}</Link></h2>
                <div>
                  <img src={category.strCategoryThumb} alt={category.strCategory} className='img-float'/>
                  <div>{category.strCategoryDescription}</div>
                </div>
              <br />
            </li>
          )
        })}
      </ul>
    </div>
  )
}