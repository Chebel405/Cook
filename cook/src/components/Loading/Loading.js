import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Loading.module.scss';


function Loading(){
    return (
        <div className='d-flex flex-row align-items-center justify-content-center flex-fill'>
            <FontAwesomeIcon icon={faSpinner} className={`${ style.faSpinner}`}/>
        </div>
    );    
}


export default Loading;