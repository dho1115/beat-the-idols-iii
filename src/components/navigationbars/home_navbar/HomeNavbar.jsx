import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'reactstrap';
import { usePost } from '../../../functions/postapi';

import "./HomeNavbar.styles.css";

const HomeNavbar = ({ arrayOfLinks /* from Homepage.jsx */ }) => {
   const navigate = useNavigate();

   if (arrayOfLinks.length) {
      return (
         <nav className='homenavbar p-3'>
            {
               arrayOfLinks.map(({ src, text }, idx) => {
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