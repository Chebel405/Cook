import { useContext, useEffect, useState } from 'react';
import styles from './Homepage.module.scss';
import Recipe from './components/Recipe/Recipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../components/Loading/Loading';
import { ApiContext } from "../../context/ApiContext";
import Search from './components/Search/Search';




function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const BASE_URL_API = useContext(ApiContext)

  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setIsLoading(true);
        // 18 articles par page
        const response = await fetch(`${BASE_URL_API}?skip=${ (page - 1) * 18 }&limit=18`);
        if(response.ok && !cancel){
          const newRecipes = await response.json();
          setRecipes(x => Array.isArray(newRecipes) ? [...x, ...newRecipes] : [...x, newRecipes]);
        }
      }catch(e){
        console.log('ERREUR');
      } finally {
        if(!cancel){
          setIsLoading(false);
        }    
      }
    } 
    fetchRecipes();
    return () => (cancel = true);
  }, [BASE_URL_API, page]);

  // Recupere le recipe
  function updateRecipe(uptatedRecipe) {
    setRecipes(
      recipes.map((r) => (r._id === uptatedRecipe._id ? uptatedRecipe : r ))
    );
  }

  

  return (
          <div className="flex-fill container d-flex flex-column p-20">
            <h1 className="my-30">Découvrez nos nouvelles recettes<small className={styles.small}>-{recipes.length}</small></h1>
            <div className={`card flex-fill d-flex-column p-20 mb-20 ${styles.contentCard}`}>
              <Search setFilter={setFilter}/>
              { isLoading && !recipes.length ? (
                <Loading/> ) : (
              <div className={styles.grid}>
                {recipes
                .filter( r => r.title.toLowerCase().startsWith(filter))
                .map((r) => (
                  <Recipe key={r._id} recipe={ r } toggleLikedRecipe={updateRecipe}/>
                ))}
              </div> 
              )}
              <div className='d-flex flex-row justify-content-center align-items-center p-20'>
                <button 
                  onClick={() => setPage(page + 1) }
                  className='btn btn-primary'>
                  Charger plus de recettes
                </button>
              </div>
            </div>
          </div>
        );
      }

 

export default Homepage;