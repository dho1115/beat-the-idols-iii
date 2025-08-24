import { useNavigate } from 'react-router-dom';
import { Card } from 'reactstrap';

import "./HomeNavbar.styles.css";

const HomeNavbar = ({ arrayOfLinks /* from Homepage.jsx */ }) => {
   const navigate = useNavigate();

   if (arrayOfLinks.length) {
      return (
         <nav className='homenavbar py-3 px-0'>
            {
               arrayOfLinks.map(({ src, text, link }, idx) => {
                  {/* arrayOfLinks from components > home > HomeNavbarLinks.jsx */}
                  return (
                     <Card className='homenavbar-card mx-5' key={idx} onClick={() => navigate(link)}>
                        <img src={src} alt={text} className='homenavbar-img' />
                        <div className='text-div'>
                           {
                              text.length >= 23 ? <strong style={{textAlign: 'center'}}>{text}</strong> : <h3 style={{textAlign: 'center'}}>{text}</h3>
                           }
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