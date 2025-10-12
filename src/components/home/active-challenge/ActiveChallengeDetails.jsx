import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { DateTime } from 'luxon';

//components.
import UploadVideo from '../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';

import { dataContext } from '../../../App';

import "../Challenges.styles.css";

const ActiveChallengeDetails = () => {
   const { _challengeID } = useParams();
   const { allUsers, currentChallenges } = useContext(dataContext);

   const { challengeCoverImage, challengeEndsOn, _challengeOwnerID, videosInChallenge, description, title, winningVotes } = currentChallenges.find(val => val._challengeID == _challengeID);

   const [videosInChallengeState, setVideosInChallengeState] = useState(videosInChallenge)

   const challengeOwnerObject = allUsers.find(val => val.id == _challengeOwnerID);

   const onHandleVote = (val) => {
      const todaysDate = DateTime.now().toFormat('yyyy-MM-dd');
      const { id } = val;
      const updateVideosInChallengeState = videosInChallengeState.map(videoInChallenge => {
         const { challengeAccessories: { votes } } = videoInChallenge;
         if (videoInChallenge.id == id) {
            if (challengeEndsOn == todaysDate) {
               alert("CHALLENGE HAS ENDED!!!")
            }
            else if (votes == winningVotes) {
               alert("CHALLENGE HAS ENDED!!!")
            }
            else videoInChallenge.challengeAccessories.votes += 1;
         }
         return videoInChallenge;
      });
      setVideosInChallengeState(updateVideosInChallengeState);
      console.log(videosInChallengeState);
   }

   return (
      <div>
         <div className='challenge-details-header my-3'>
            <div className='challenge-details-description-div p-3'>
               <h3>Challenge ID: <span className='text-danger'>{_challengeID}</span></h3>
               <h3>OWNER: {challengeOwnerObject.username} (id# {_challengeOwnerID})</h3>
               <h3>EXPIRES: {challengeEndsOn}.</h3>
               <h3>TITLE: <span className='text-danger'>{title}</span>.</h3>
               <h3>DESCRIPTION:<span className='text-danger'>{description}</span>.</h3>
               {
                  winningVotes && <h3>First video to reach <span className='text-danger'>{winningVotes}</span> votes wins!!!.</h3>
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
                     idx={idx}   
                     video_component={<YouTubeVideo url={val.urlOrFile} title={val.title} />}
                     title={val.title}
                     description={null}
                     username={val.username}
                     votes={val.challengeAccessories.votes}
                     button_text="VOTE FOR THIS VIDEO!!!"
                     clickLogic={() => onHandleVote(val)}
                  />
               ))
            }
         </Container>
      </div>
   )
}

export default ActiveChallengeDetails