import React, { Suspense, useContext, useRef, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import { dataContext } from '../../App';

//Components;
import ChallengeWrapper from '../templates/challenge_wrapper/ChallengeWrapper';
import SuspenseFallback from '../suspense_fallback/SuspenseFallback';

import './Challenges.styles.css';

const CurrentChallenges = () => {
  const { currentChallenges } = useContext(dataContext);
  const currentChallengesRef = useRef();
  const navigate = useNavigate();

  const setGridTemplateColumns = currentChallenges.length >= 5 ? "auto auto auto auto auto" : currentChallenges.map((_, __, arr) => `${((1/100)*100)*25}%`).join(" ")
    
  useLayoutEffect(() => {
    if (currentChallengesRef?.current?.style) currentChallengesRef.current.style.gridTemplateColumns = setGridTemplateColumns;    
  }, [currentChallengesRef?.current?.style])

  if (!currentChallenges.length) {
    return (
      <Container className='my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid black', backgroundColor: 'peachpuff' }}>
        <h1>SORRY... THERE ARE NO CURRENT CHALLENGES.</h1>
      </Container>
    )
  }

  const challenges = currentChallenges.map((val, idx) => (
      <Suspense fallback={<h3 style={{ backgroundColor: 'yellow', color: 'firebrick'}}>...Loading.</h3>}>
        <div className='mx-3'>
          <ChallengeWrapper
            coverImg={val.challengeCoverImage}
            expires = {val.challengeEndsOn? val.challengeEndsOn : null}
            title={val.title}
            button_text="DETAILS."
            _ownerID = {val._challengeOwnerID}
            winningVotes = {val.winningVotes}
            clickLogic={() => navigate(`/home/active-challenge/${val._challengeID}`)}
          />
        </div>
        
      </Suspense>
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