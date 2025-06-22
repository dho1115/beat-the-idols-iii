import React, { Suspense, useContext } from 'react';

import SuspenseFallback from '../suspense_fallback/SuspenseFallback';
import { Container } from 'reactstrap';
import { dataContext } from '../../App';

const CurrentChallenges = () => {
  const { currentChallenges } = useContext(dataContext);

  if (!currentChallenges.length) {
    return (
      <div>
        <Container className='my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid black', backgroundColor: 'peachpuff' }}>
          <h1>SORRY... THERE ARE NO CURRENT CHALLENGES.</h1>
        </Container>
      </div>
    )
  }

  return (
    <div>
      <Suspense fallback={<SuspenseFallback />}>
        <h1>CURRENT CHALLENGES.</h1>
        {/* <h3>{JSON.stringify(data)}</h3> */}
      </Suspense>      
    </div>
  )
}

export default CurrentChallenges