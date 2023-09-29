import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Search({setFilter}){

    /**
   * Fonction permettant de filtrer les recherches de l'utilisateur
   * @param {*} e récupere l'evenement, la valeur de l'input
   * setFilter va filtrer la demande tapée.
   */
  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }

    return(
        <div className={ `d-flex flex-row justify-content-center align-item-center my-30 ${styles.searchBar}` }>  
                <FontAwesomeIcon icon={faSearch} className="fa-magnifying-glass m-15" />
                <input onInput={ handleInput } className='flex-fill'type='text'placeholder='Recherche' />
        </div>
    )
}
export default Search;