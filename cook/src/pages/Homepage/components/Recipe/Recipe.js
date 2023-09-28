import styles from './Recipe.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ApiContext } from '../../../../context/ApiContext';


// Décomposer l'objet recipe pour récupérer les informations

function Recipe({  recipe: { _id, liked, title, image}, toggleLikedRecipe}) {
  const BASE_URL_API = useContext(ApiContext);

  // faire une requête à un serveur donc "async"
  async function handleClick() {
    try{
      const response = await fetch(`${BASE_URL_API}/${ _id }`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          liked: !liked
        })
      });
      if(response.ok) {
        const uptatedRecipe = await response.json();
        toggleLikedRecipe(uptatedRecipe);
      }
    } catch(e) {
      console.log("ERREUR");

    }
  }

 

  return (
    <div onClick={handleClick} className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <div
          className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
      <h3 className="mb-10">{title}</h3>
        <i className={`${liked ? 'text-primary' : ''}`}>
        <FontAwesomeIcon icon={faHeart} />
        </i>
        
    
      </div>
  </div>
  );
}

 

export default Recipe;