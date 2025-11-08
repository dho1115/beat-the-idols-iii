import React, { useContext, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { DateTime } from 'luxon';

//components.
import UploadVideo from '../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';

//functions.
import { addVoteToVideoLogic, calculateHighestVote, challengeHasEnded, findLeaders, updateRecordInVideosState, updateVideoRecords } from './functions';
import { timeRemaining } from '../../../functions/remainingtime';

import { UpdateDataAPI, UpdateDataInDBThenSetState } from '../../../functions/updateapi';
import { PatchDataAPI } from '../../../functions/patchapi';

import { dataContext } from '../../../App';

import "../Challenges.styles.css";

const ActiveChallengeDetails = () => {
   const { _challengeID } = useParams();
   const location = useLocation();
   const { allUsers, currentChallenges, videos, setVideos } = useContext(dataContext);

   const thisChallenge = currentChallenges.find(val => val._challengeID == _challengeID);

   const { challengeCoverImage, challengeEndsOn, _challengeOwnerID, videosInChallenge, description, title, winningVotes } = thisChallenge;

   const [highestVoteState, setHighestVoteState] = useState(0);

   const [videosInChallengeState, setVideosInChallengeState] = useState(videosInChallenge);

   const [daysRemainingForChallenge, setDaysRemainingForChallenge] = useState(timeRemaining(DateTime, challengeEndsOn));

   const challengeOwnerObject = allUsers.find(val => val.id == _challengeOwnerID);

   const onHandleVote = ({ id, challengeAccessories: { votes } }) => {
      const addVoteToSelectedVideo = addVoteToVideoLogic(videosInChallengeState, id); //[{...video, vote:vote+1}]:videosInChallenge.

      PatchDataAPI(`http://localhost:3003/activeChallenges/${_challengeID}`, { videosInChallenge: addVoteToSelectedVideo })
         .then(({ newData, result, url }) => { /* { newData: videosInChallenge:[{...video: vote: vote+1}], result, url } */

            (result.ok) && setVideosInChallengeState(newData.videosInChallenge); //add vote.
            return { newData, result, url };
         })
         .then(({ newData }) => {
            const challengeEnded = challengeHasEnded(id, daysRemainingForChallenge, votes, winningVotes) //true or false.
            const highestVote = calculateHighestVote(videosInChallengeState);
            (highestVote != highestVoteState) && setHighestVoteState(highestVote); //set state ONLY if new highest vote.
            return { highestVote, challengeEnded };
         })
         .then(({ highestVote, challengeEnded }) => {
            if (challengeEnded) {
               const leadersAndLosers = updateVideoRecords(thisChallenge, videos);
               const videos_updated = updateRecordInVideosState(videos, leadersAndLosers)
               return UpdateDataInDBThenSetState(UpdateDataAPI, 'http://localhost:3003/videos', videos_updated, () => setVideos(videos_updated)).catch(error => console.error({ location: location.pathname, message: "UpdateDataInDBThenSetState ERROR (PatchDataAPI)!!!", error, errorCode: error.code, errorMessage: error.message }));
            } //Logic if active challenge has ended.
            const leaders = findLeaders(videosInChallengeState, highestVote); //current vote leaders.
            return leaders;
         })
         .catch(err => console.error({ message: "PatchDataAPI error!!!", err, errCode: err.code, errMessage: err.message })); //vote logic.
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