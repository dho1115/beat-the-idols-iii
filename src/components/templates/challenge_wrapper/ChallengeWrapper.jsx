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
      <Card className='m-1' style={{ border: idx % 2 == 1 ? '3.5px solid lightseagreen' : '3.5px solid red', height: '30%', width: '19%', borderRadius: '15.3px' }}>
         <Suspense fallback={<SuspenseFallback />}>
            <div className='w-100 p-0 cover-img-div'>
               <img src={coverImg} alt='cover pic for challenge wrapper' className='cover-img'/>
            </div>
            <CardTitle className='p-1'>
               <strong>
                  {title.length > 19 ? title.substring(0, 19) + "..." : title}
               </strong>
            </CardTitle>    
            {
               (button_text && clickLogic)
               &&
               <CardFooter className='w-100' style={{backgroundColor: 'black'}}>
                  <Button type="button" color='danger' className= 'btn btn-block w-100' onClick={clickLogic || null}>{button_text}</Button>
               </CardFooter>
            }
         </Suspense>
      </Card>
   )
}

export default ChallengeWrapper