import React, { Suspense, useContext, useRef, useEffect } from 'react';

import SuspenseFallback from '../suspense_fallback/SuspenseFallback';
import { Container } from 'reactstrap';
import { dataContext } from '../../App';

import './Challenges.styles.css';

const CurrentChallenges = () => {
  const { currentChallenges } = useContext(dataContext);
  const currentChallengesRef = useRef();
  const setGridTemplateColumns = currentChallenges.length >= 5 ? "auto auto auto auto auto" : currentChallenges.map((_, __, arr) => `${(100/(arr.length))-1}%`).join(" ")

  useEffect(() => {
    if (currentChallengesRef?.current?.style?.setGridTemplateColumns)currentChallengesRef.current.style.setGridTemplateColumns = setGridTemplateColumns
    return () => {
      
    };
  }, [])

  if (!currentChallenges.length) {
    return (
      <Container className='my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid black', backgroundColor: 'peachpuff' }}>
        <h1>SORRY... THERE ARE NO CURRENT CHALLENGES.</h1>
      </Container>
    )
  }

  const challenges = currentChallenges.map((val, idx) => (
    <div key={idx}>
      {
        <div className='mx-1 p-1' style={{
          overflowWrap: 'anywhere',
          border: `1.5px solid ${idx%2 == 1 ? 'lightseagreen' : 'firebrick'}`,
          backgroundColor: `${idx % 2 == 1 ? 'bisque' : 'antiquewhite'}`
        }}>
          <strong>{JSON.stringify(val)}</strong>
        </div>
      }
    </div>
  ));

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <h1>CURRENT CHALLENGES.</h1>
      {
        <Container className='challengesContainer p-3' ref={currentChallengesRef}>
          { challenges }
        </Container>
      }
    </Suspense>      
  )
}

export default CurrentChallenges