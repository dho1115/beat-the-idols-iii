import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Label, Button, FormGroup, Alert } from 'reactstrap';
import { ChallengeDetailsContext } from '../ChallengeFormComponent';
import { dataContext } from '../../../../App';
import MapCurrentUserVideos from './MapCurrentUserVideos';

import "./ChallengeVideos.styles.css";

const AddChallengeVideos = () => {
   const navigate = useNavigate();
   const [selectedVideos, setSelectedVideos] = useState([])
   const [addVideoAlert, setAddVideoAlert] = useState(false)
   const { currentUser } = useContext(dataContext);
   const { challengeDetails, setChallengeDetails } = useContext(ChallengeDetailsContext);

   const { challengeAnnouncementID } = challengeDetails;

   const onHandleSubmitChallengeVideos = e => {
      e.preventDefault();
      if ((!challengeAnnouncementID && (selectedVideos.length < 2)) || !selectedVideos.length) {
         setAddVideoAlert(true)
         return;
      } //If you are NOT inviting others, you must select at least 2 videos.
      setChallengeDetails(prv => ({ ...prv, videosInChallenge: [...challengeDetails.videosInChallenge, ...selectedVideos] }));
      
      navigate(`/currentUser/${currentUser.id}/challenge-form/cover`);
   }

   useEffect(() => () => {
         setSelectedVideos([])
         setAddVideoAlert(false)
      }, []) //cleanup.

   return (
      <div className="challenge-videos-form p-3 m-3">
         {
            addVideoAlert && <Alert color='danger'><h3>PLEASE SELECT AT LEAST 2 VIDEO2 (you currently have {selectedVideos.length} videos) OR SELECT 1 VIDEO <i>AND</i> SELECT "INVITE OTHERS"!!!</h3></Alert>
         }
         <FormGroup>
            <Label><strong>SELECT CHALLENGE VIDEOS!!!</strong></Label>
            <MapCurrentUserVideos selectedVideos={selectedVideos} setSelectedVideos={setSelectedVideos} />
         </FormGroup>
         <FormGroup>
            <Button type='button' color='danger' className='w-100' onClick={onHandleSubmitChallengeVideos}>FINISHED SELECTING VIDEOS.</Button>
         </FormGroup>
      </div>      
   )
}

export default AddChallengeVideos