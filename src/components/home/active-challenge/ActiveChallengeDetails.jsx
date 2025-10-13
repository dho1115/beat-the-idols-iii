import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { DateTime } from 'luxon';

//components.
import UploadVideo from '../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';

//functions.
import { challengeHasEnded } from './functions';

import { dataContext } from '../../../App';

import "../Challenges.styles.css";
import WinningVotesOption from '../../forms/challenge/challenge_ends_option/WinningVotesOption';

const ActiveChallengeDetails = () => {
   const { _challengeID } = useParams();
   const { allUsers, currentChallenges } = useContext(dataContext);

   const { challengeCoverImage, challengeEndsOn, _challengeOwnerID, videosInChallenge, description, title, winningVotes } = currentChallenges.find(val => val._challengeID == _challengeID);

   const [videosInChallengeState, setVideosInChallengeState] = useState(videosInChallenge)

   const [daysRemainingForChallenge, setDaysRemainingForChallenge] = useState(DateTime.fromISO(challengeEndsOn).diff(DateTime.now(), ['days']));

   const challengeOwnerObject = allUsers.find(val => val.id == _challengeOwnerID);

   const onHandleVote = (val) => {
      const { id } = val;
      const { votes } = val.challengeAccessories;
      if (challengeHasEnded(id, daysRemainingForChallenge.days.toFixed(3), votes, winningVotes)) {
         alert(`CHALLENGE HAS ENDED!!! RESULTS ARE: ${JSON.stringify(videosInChallengeState)}.`)
         return;
      }

      const updateVideosInChallengeState = videosInChallengeState.map(videoInChallenge => {
         if (videoInChallenge.id == id) videoInChallenge.challengeAccessories.votes += 1;
         return videoInChallenge;
      });

      setVideosInChallengeState(updateVideosInChallengeState);
      console.log(videosInChallengeState);
   }

   useEffect(() => {
      if (daysRemainingForChallenge.days.toFixed(3) <= 0) {
         alert(`THIS CHALLENGE HAS ENDED!!! THE RESULTS ARE: ${JSON.stringify(videosInChallengeState)}.`);
      }
   }, [])

   return (
      <div>
         <div className='challenge-details-header my-3'>
            <div className='challenge-details-description-div p-3'>
               <h3>Challenge ID: <span className='text-danger'>{_challengeID}</span></h3>
               <h3>OWNER: {challengeOwnerObject.username} (id# {_challengeOwnerID})</h3>
               <h3>EXPIRES: {challengeEndsOn} (<span className='text-danger'>{daysRemainingForChallenge.days.toFixed(3)} days left</span>).</h3>
               <h3>TITLE: <span className='text-danger'>{title}</span>.</h3>
               <h3>DESCRIPTION:<span className='text-danger'>{description}</span>.</h3>
               {
                  winningVotes ? <h3>First video to reach <span className='text-danger'>{winningVotes}</span> votes wins!!!.</h3>: ""
               }
            </div>
            <div className='challenge-details-img-div'>
               <img src={challengeCoverImage} alt='challenge cover img' className='challenge-details-img' />
            </div>
         </div>
         <Container className='videosInChallengeDetails'>
            {
               videosInChallengeState.map((val, idx) => (
                  <VideoWrapper
                     key={idx}
                     idx={idx}   
                     video_component={val.videoType=='you-tube' ? <YouTubeVideo title={val.title} url={val.urlOrFile} /> : <UploadVideo file={val.urlOrFile} />}
                     title={val.title}
                     description={null}
                     username={val.username}
                     votes={val.challengeAccessories.votes}
                     button_text={challengeHasEnded(val.id, daysRemainingForChallenge.days.toFixed(3), val.votes, winningVotes) ? "THIS CHALLENGE HAS ENDED!!!" : "VOTE FOR THIS VIDEO!!!"}
                     clickLogic={() => onHandleVote(val)}
                     disabled={challengeHasEnded(val.id, daysRemainingForChallenge.days.toFixed(3), val.votes, winningVotes)}
                  />
               ))
            }
         </Container>
      </div>
   )
}

export default ActiveChallengeDetails