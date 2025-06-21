import {useState, useEffect, useContext} from 'react'

//Dependencies.
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { dataContext } from '../../../App';
import { usePost } from '../../../functions/postapi';

//Media.
import logo from "../../../media/images/BeatTheIdols_NoBackground.png";

import "./WelcomeNavbar.styles.css";

const WelcomeNavbar = () => {
  const location = useLocation();
  const { currentUser, setCurrentUser } = useContext(dataContext);
  const { id, username } = currentUser;

  const [generalRoutes, setGeneralRoutes] = useState([{ name: 'welcome', path: '/' }, { name: 'home', path: '/home' }, { name: 'about', path: '/about' }, { name: 'contact', path: '/contact' }, { name: 'register', path: '/register' }])
  
  useEffect(() => {
    if (id && username) {
      setGeneralRoutes(prv => ([...prv, {name: `Welcome, ${username}!!!`, path: '/'}]))
    }
  }, [id, username]); //Checks to see if there is a current user.

  return (
    <nav className='welcome-navbar p-1 mb-0 sticky-top' style={{position: 'absolute', top: '0%', left: '0%', right: '0%'}}>
      <a class="navbar-brand" href="/" style={{ width: '3vw' }}><img src={logo} className='img-thumbnail welcome-nav-img' /></a> {/* logo on the left */}
      <div className='welcome-link-container p-0'>
        {
          generalRoutes
            .filter(val => val.path != location.pathname) //shows links that do not lead back to the page you are currently on.
            .map(({name, path}, idx) => {
              if ((name == 'register') && (id && username) && (location.pathname != "/")) {
                return (
                  <Link to="/" key={idx} onClick={() => alert("create logic to log out of database as well as the useContext state!!!")}><strong>LOG OUT!!!</strong></Link>
                )
              }
              else if (name == 'register' && (id && username) && (location.pathname == '/')) {
                return (
                  <Link to={path}><strong style={{ color: 'whiteSmoke' }} key={idx}>{username}'s homepage</strong></Link>
                )
              }
              else {
                return (
                  <Link to={path}><strong style={{ color: 'whiteSmoke' }} key={idx}>{name}</strong></Link>
                )
              }
            })
        }
      </div>      
    </nav>
  )
}

export default WelcomeNavbar