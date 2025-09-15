import React, { Suspense, useContext } from 'react';
import SuspenseFallback from '../../suspense_fallback/SuspenseFallback';

//Dependencies & components.
import { Card, CardBody, CardFooter, CardText, CardTitle, Button } from 'reactstrap';

//Contexts
import { dataContext } from '../../../App';

import './ChallengeWrapper.styles.css';

const ChallengeWrapper = ({ coverImg, title, description, button_text, clickLogic, ...args }) => {
   const { _ownerID, idx } = args;
   const { allUsers } = useContext(dataContext);

   const { username, email } = allUsers.find(({ id }) => id == _ownerID);

   return (
      <Card className='m-1' style={{ position: 'relative', border: idx % 2 == 1 ? '3.5px solid lightseagreen' : '3.5px solid red', height: '100%', width: '100%', borderRadius: '15.3px', overflow: 'hidden', objectFit: 'cover' }}>
         <Suspense fallback={<SuspenseFallback />}>
            <img src={coverImg} alt='cover pic for challenge wrapper' className='cover-img'/>
            <CardTitle className='p-1' style={{position: 'relative', width: '100%', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               <h3 className='title'> {title.length > 25 ? title.substring(0, 25) + "..." : title} </h3>
            </CardTitle>    
            {
               (button_text && clickLogic)
               &&
               <CardFooter className='w-100' style={{position: 'relative', zIndex: 1}}>
                  <Button type="button" color='danger' className= 'btn btn-block w-100' onClick={clickLogic || null}>{button_text}</Button>
               </CardFooter>
            }
         </Suspense>
      </Card>
   )
}

export default ChallengeWrapper