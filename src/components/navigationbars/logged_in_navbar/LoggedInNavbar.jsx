import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { dataContext } from '../../../App';

import "./LoggedInNavbar.styles.css";

const LoggedInNavbar = () => {
   const { currentUser } = useContext(dataContext);
   const { id } = currentUser;
   return (
      <nav className='logged-in-navbar m-0'>
         <Link to= {`/currentUser/${id}/challenge-form`}><strong>START A CHALLENGE!!!</strong></Link>
      </nav>
   )
}

export default LoggedInNavbar