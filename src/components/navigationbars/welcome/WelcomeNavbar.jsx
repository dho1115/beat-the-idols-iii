import {useEffect, useContext} from 'react'

//Dependencies.
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { dataContext } from '../../../App';

//Media.
import logo from "../../../media/images/BeatTheIdols_NoBackground.png";

import "./WelcomeNavbar.styles.css";

const WelcomeNavbar = () => {
  const location = useLocation();
  const { currentUser, welcomeLinks, setWelcomeLinks } = useContext(dataContext);
  const { id, username } = currentUser;

  return (
    <nav className='welcome-navbar p-1 mb-0 sticky-top' style={{position: 'absolute', top: '0%', left: '0%', right: '0%'}}>
      <a class="navbar-brand" href="/" style={{ width: '3vw' }}><img src={logo} className='img-thumbnail welcome-nav-img' /></a> {/* logo on the left */}
      <div className='welcome-link-container p-0'>
        {
          welcomeLinks
            .filter(val => val.path != location.pathname) //shows links that do not lead back to the page you are currently on.
            .map(({name, path, onClick}, idx) => <Link to={path} onClick={onClick || null}><strong style={{ color: 'whiteSmoke' }} key={idx}>{name}</strong></Link>)
        }
      </div>      
    </nav>
  )
}

export default WelcomeNavbar