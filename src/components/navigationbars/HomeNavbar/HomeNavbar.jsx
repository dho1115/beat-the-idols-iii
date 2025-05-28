import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'reactstrap'
import { HomeNavbarLinks } from '../../home/HomeNavbarLinks';

import "./HomeNavbar.styles.css";

const HomeNavbar = ({ arrayOfLinks }) => {
   const navigate = useNavigate();

   if (arrayOfLinks.length) {
      return (
         <nav className='homenavbar p-3'>
            {
               arrayOfLinks.map(({src, text}, idx) => {
                  return (
                     <Card className='homenavbar-card' key={idx} onClick={() => navigate("/home/current-challenges")}>
                        <img src={src} alt={text} className='homenavbar-img' />
                        <div className='text-div'>
                           <h3>{text}</h3>
                        </div>                        
                     </Card>
                  )
               })
            }
         </nav>
      )
   } else {
      return (
         <nav>
            <strong>NO LINKS YET.</strong>
         </nav>
      )
   }
}

export default HomeNavbar