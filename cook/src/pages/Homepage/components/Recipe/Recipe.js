import { useState } from 'react';
import styles from './Recipe.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
//continuer ici

 

function Recipe({ title, image }) {
  const [liked, setLiked] = useState(false);

 

  function handleClick() {
    setLiked(!liked);
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