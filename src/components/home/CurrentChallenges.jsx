import React, { Suspense } from 'react';

import { useFetch } from '../../functions/fetchapi';
import SuspenseFallback from '../suspense_fallback/SuspenseFallback';
import { Container } from 'reactstrap';

const CurrentChallenges = () => {
  const [data, setData] = useFetch("http://localhost:3003/currentChallenges", []);
  console.log("DATA IS: ", data);

  if (!data.length) {
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
        <h3>{JSON.stringify(data)}</h3>
      </Suspense>      
    </div>
  )
}

export default CurrentChallenges