import styles from "./Header.module.scss";
import cookchef from "../../assets/images/cook-chef-logo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";

 

function Header() {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      {/* <i className="fa-regular fa-bars mr-15"></i> */}
      <div className="flex-fill">
        <img src={cookchef} alt="logo cookchef" />
      </div>
      <ul className={styles.headerList}>
        <button className="mr-5 btn btn-reverse-primary">
          <FontAwesomeIcon icon={faHeart} />
          <span>panier</span>
        </button>
        <button className="btn btn-primary">connexion</button>
      </ul>
      <i
        onClick={() => setShowMenu(true)}/>
        <FontAwesomeIcon icon={faBars} />
        {showMenu && (
          <>
            <div onClick={() => setShowMenu(false)} className="calc"></div>
            <HeaderMenu />
          </>
        )}
    </header>
  );
}

 

export default Header;