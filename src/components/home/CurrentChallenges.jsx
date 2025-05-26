import React, { Suspense } from 'react';

import { useFetch } from '../../functions/fetchapi';
import SuspenseFallback from '../suspense_fallback/SuspenseFallback';

const CurrentChallenges = () => {
  const [data, setData] = useFetch("http://localhost:3003/currentChallenges", []);
  console.log("DATA IS: ", data);

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