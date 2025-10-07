import React, { Suspense, useContext, useRef, useEffect } from 'react';
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

  console.log(currentChallenges);
  debugger;
  
  // const setGridTemplateColumns = currentChallenges.length >= 5 ? "auto auto auto auto auto" : currentChallenges.map((_, __, arr) => `${19}%`).join(" ")

  const setGridTemplateColumns = "19.5% 19.5% 19.5% 19.5% 19.5%";

  useEffect(() => {
    if (currentChallengesRef?.current?.style?.setGridTemplateColumns) currentChallengesRef.current.style.setGridTemplateColumns = setGridTemplateColumns;
  }, [])

  if (!currentChallenges.length) {
    return (
      <Container className='my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid black', backgroundColor: 'peachpuff' }}>
        <h1>SORRY... THERE ARE NO CURRENT CHALLENGES.</h1>
      </Container>
    )
  }

  const challenges = currentChallenges.map((val, idx) => (
    <div key={idx} className='mx-1 p-1 current-challenge-wrapper-div' style={{border: `1.5px solid ${idx%2 == 1 ? 'lightseagreen' : 'firebrick'}`, backgroundColor: `${idx % 2 == 1 ? 'bisque' : 'antiquewhite'}`}}>
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