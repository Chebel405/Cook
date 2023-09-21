import { useState } from 'react';
import styles from './Content.module.scss';
import Recipe from './Recipe';
import { data } from './data/recipes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



 

function Content() {
  const recipes = data;
  const[filter, setFilter] = useState('');

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
          <div className="flex-fill container p-20">
            <h1 className="my-30">Découvrez nos nouvelles recettes</h1>
            <div className={`card d-flex-column p-20 ${styles.contentCard}`}>
              <div className={ `d-flex flex-row justify-content-center align-item-center my-30 ${styles.searchBar}` }>  
                <FontAwesomeIcon icon={faSearch} className="fa-magnifying-glass m-15" />
                <input onInput={ handleInput } className='flex-fill'type='text'placeholder='Recherche' />
              </div>

              <div className={styles.grid}>
                {recipes
                .filter( r => r.title.toLowerCase().startsWith(filter))
                .map((r) => (
                  <Recipe key={r._id} title={r.title} image={r.image} />
                ))}
              </div>
            </div>
          </div>
        );
      }

 

export default Content;