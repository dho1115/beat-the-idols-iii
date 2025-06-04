import {useState, useEffect, useContext} from 'react'

//Dependencies.
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { dataContext } from '../../../App';

//Media.
import logo from "../../../media/images/BeatTheIdols_NoBackground.png";

import "./WelcomeNavbar.styles.css";

const WelcomeNavbar = () => {
  const location = useLocation();
  const { currentUser } = useContext(dataContext);

  const [generalRoutes, setGeneralRoutes] = useState([{ name: 'welcome', path: '/' }, { name: 'home', path: '/home' }, { name: 'about', path: '/about' }, { name: 'contact', path: '/contact' }, { name: 'register', path: '/register' }])
  
  useEffect(() => {
    if (currentUser._userID && currentUser.username) {
      setGeneralRoutes(prv => ([...prv, {name: `Welcome, ${currentUser.username}!!!`, path: '/'}]))
    }
  }, [Object.values(currentUser).length]);

  return (
    <nav className='welcome-navbar p-1 mb-0 sticky-top' style={{position: 'absolute', top: '0%', left: '0%', right: '0%'}}>
      <a class="navbar-brand" href="/" style={{ width: '3vw' }}><img src={logo} className='img-thumbnail welcome-nav-img' /></a>
      <div className='welcome-link-container p-0'>
        {
          generalRoutes
            .filter(val => val.path != location.pathname)
            .map((route, idx) => <Link to={route.path}><strong style={{color: 'whiteSmoke'}} key={idx}>{route.name}</strong></Link>)
        }
      </div>      
    </nav>
  )
}

export default WelcomeNavbar