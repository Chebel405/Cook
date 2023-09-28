import { useContext, useEffect, useState } from 'react';
import styles from './Homepage.module.scss';
import Recipe from './components/Recipe/Recipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../components/Loading/Loading';
import { ApiContext } from "../../context/ApiContext";




function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('');
  const BASE_URL_API = useContext(ApiContext)

  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setIsLoading(true);
        const response = await fetch(BASE_URL_API);
        if(response.ok && !cancel){
          const recipes = await response.json();
          setRecipes(Array.isArray(recipes) ? recipes : [recipes]);
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
  }, [BASE_URL_API]);

  // Recupere le recipe
  function updateRecipe(uptatedRecipe) {
    setRecipes(
      recipes.map((r) => (r._id === uptatedRecipe._id ? uptatedRecipe : r ))
    );
  }

  /**
   * Fonction permettant de filtrer les recherches de l'utilisateur
   * @param {*} e récupere l'evenement, la valeur de l'input
   * setFilter va filtrer la demande tapée.
   */
  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }

 

  return (
          <div className="flex-fill container d-flex flex-column p-20">
            <h1 className="my-30">Découvrez nos nouvelles recettes</h1>
            <div className={`card flex-fill d-flex-column p-20 mb-20 ${styles.contentCard}`}>
              <div className={ `d-flex flex-row justify-content-center align-item-center my-30 ${styles.searchBar}` }>  
                <FontAwesomeIcon icon={faSearch} className="fa-magnifying-glass m-15" />
                <input onInput={ handleInput } className='flex-fill'type='text'placeholder='Recherche' />
              </div>
              { isLoading ? (
                <Loading/> ) : (
              <div className={styles.grid}>
                {recipes
                .filter( r => r.title.toLowerCase().startsWith(filter))
                .map((r) => (
                  <Recipe key={r._id} recipe={ r } toggleLikedRecipe={updateRecipe}/>
                ))}
              </div> 
              )}
            </div>
          </div>
        );
      }

 

export default Homepage;