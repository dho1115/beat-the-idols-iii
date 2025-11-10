import React, { useContext, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { DateTime } from 'luxon';

//components.
import UploadVideo from '../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';

//functions.
import { addVoteToVideoLogic, calculateHighestVote, challengeHasEnded } from './functions';
import { handleExpiredActiveChallenges } from 'src/functions/AppJsxFunctions';
import { timeRemaining } from '../../../functions/remainingtime';
import { PatchDataAPI } from '../../../functions/patchapi';

import { dataContext } from '../../../App';

import "../Challenges.styles.css";

const ActiveChallengeDetails = () => {
   const { _challengeID } = useParams();
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const { allUsers, currentChallenges, currentUser, videos, setVideos } = useContext(dataContext);

   const thisChallenge = currentChallenges.find(val => val._challengeID == _challengeID);

   const { challengeCoverImage, challengeEndsOn, _challengeOwnerID, videosInChallenge, description, title, winningVotes } = thisChallenge;

   const [highestVoteState, setHighestVoteState] = useState(0);

   const [videosInChallengeState, setVideosInChallengeState] = useState(videosInChallenge);

   const [daysRemainingForChallenge, setDaysRemainingForChallenge] = useState(timeRemaining(DateTime, challengeEndsOn));

   const challengeOwnerObject = allUsers.find(val => val.id == _challengeOwnerID);

   const onHandleVote = async ({ id, challengeAccessories: { votes } }) => {
      try {
         const addVoteToSelectedVideo = addVoteToVideoLogic(videosInChallengeState, id); //[{...video, vote:vote+1}]:videosInChallenge.

         const highestVoteSoFar = calculateHighestVote(videosInChallengeState);

         const didChallengeEnd = challengeHasEnded(id, daysRemainingForChallenge, votes + 1, winningVotes); //Boolean.

         const { newData, result, url } = await PatchDataAPI(`http://localhost:3003/activeChallenges/${_challengeID}`, { videosInChallenge: addVoteToSelectedVideo });

         if (result.ok) setVideosInChallengeState(newData.videosInChallenge);
         else throw new Error(`Result is not ok: ${result.ok}. Status is ${result.status}. Text is ${result.status}.`)

         if (didChallengeEnd) {
            const expiredChallenge = currentChallenges.filter(({ id }) => id == _challengeID);
            const expiredChallenges = await handleExpiredActiveChallenges(expiredChallenge, videos, currentChallenges, DateTime, (data) => setVideos(data), pathname)
            navigate('/home');
         }
      } catch (error) {
         console.error({ message: "ERROR inside onHandleVote function!!!", location: pathname, error, errorMessage: error.message, errorName: error.name, errorCode: error.code });
      }
   }

   return (
      <div>
         <div className='challenge-details-header my-3'>
            <div className='challenge-details-description-div p-3'>
               <h3>Challenge ID: <span className='text-danger'>{_challengeID}</span></h3>
               <h3>OWNER: {challengeOwnerObject.username} (id# {_challengeOwnerID})</h3>
               <h3>EXPIRES: {challengeEndsOn} (<span className='text-danger'>{daysRemainingForChallenge} days left</span>).</h3>
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
                     button_text={challengeHasEnded(val.id, daysRemainingForChallenge, val.votes, winningVotes) ? "THIS CHALLENGE HAS ENDED!!!" : "VOTE FOR THIS VIDEO!!!"}
                     clickLogic={() => onHandleVote(val)}
                     disabled={challengeHasEnded(val.id, daysRemainingForChallenge, val.votes, winningVotes)}
                  />
               ))
            }
         </Container>
      </div>
   )
}

export default ActiveChallengeDetails