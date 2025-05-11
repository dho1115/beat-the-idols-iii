import {useEffect} from 'react'

//Dependencies.
import { Link } from 'react-router-dom';
import logo from "../../../media/images/BeatTheIdols_NoBackground.png";
import { useGeneralRoutes } from '../../../useRoutes';
import { useLocation } from 'react-router-dom';

import "./WelcomeNavbar.styles.css";

const WelcomeNavbar = () => {
  const location = useLocation();

  const [generalRoutes, setGeneralRoutes] = useGeneralRoutes([{name: 'welcome', path: '/'}, {name: 'home', path: '/home'}, {name: 'about', path: '/about'}, {name: 'contact us!!!', path: '/contact'}])

  console.log({ generalRoutes });
  console.log({ locationPathname: location.pathname });

  return (
    <nav className='welcome-navbar p-1 sticky-top' style={{position: 'absolute', top: '0%', left: '0%', right: '0%'}}>
      <a class="navbar-brand" href="/" style={{ width: '3vw' }}><img src={logo} className='img-thumbnail welcome-nav-img' /></a>
      <div className='welcome-link-container p-0'>
        {
          generalRoutes
            .filter(val => val.path != location.pathname)
            .map(route => <Link to={route.path}><strong style={{color: 'whiteSmoke'}}>{route.name}</strong></Link>)
        }
      </div>      
    </nav>
  )
}

export default WelcomeNavbar