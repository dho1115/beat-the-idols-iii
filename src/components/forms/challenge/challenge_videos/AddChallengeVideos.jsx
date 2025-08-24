import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Label, Button, Container, FormGroup, Alert } from 'reactstrap';
import { ChallengeDetailsContext } from '../ChallengeFormComponent';
import { dataContext } from '../../../../App';
import UploadVideo from '../../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../../templates/video/you_tube/YouTubeVideo';

import "./ChallengeVideos.styles.css";

const AddChallengeVideos = () => {
   const navigate = useNavigate();
   const videosContainerRef = useRef();
   const [selectedVideos, setSelectedVideos] = useState([])
   const [addVideoAlert, setAddVideoAlert] = useState(false)
   const { videos, currentUser } = useContext(dataContext);
   const { challengeDetails, setChallengeDetails } = useContext(ChallengeDetailsContext);
   const { inviteOthers } = challengeDetails;
   const currentUsersVideos = videos.filter(({ _userID }) => _userID == currentUser.id); //We only want current user to select his/her/their own videos.

   const onHandleSubmitChallengeVideos = e => {
      e.preventDefault();
      if ((!inviteOthers && (selectedVideos < 2)) || !selectedVideos.length) {
         setAddVideoAlert(true)
         return;
      } //If you are NOT inviting others, you must select at least 2 videos.
      console.log("About to submit:", selectedVideos);
      setChallengeDetails(prv => ({ ...prv, challengeVideos: [...challengeDetails.challengeVideos, ...selectedVideos] }));
   }

   useLayoutEffect(() => {
      const setGridTemplateColumns = currentUsersVideos.length >= 5 ?
         "auto auto auto auto auto"
         :
         currentUsersVideos.map(() => `${(100 / (currentUsersVideos.length))}%`).join(" ");
      
      videosContainerRef.current.style.gridTemplateColumns = setGridTemplateColumns
      return () => {
         setSelectedVideos([])
         setAddVideoAlert(false)
      }
   }, [])

   return (
      <div className="challenge-videos-form p-3 m-3">
         {
            addVideoAlert && <Alert color='danger'><h3>PLEASE SELECT AT LEAST 2 VIDEO2 (you currently have {selectedVideos.length} videos) OR SELECT 1 VIDEO <i>AND</i> SELECT "INVITE OTHERS"!!!</h3></Alert>
         }
         <FormGroup>
            <Label><strong>SELECT CHALLENGE VIDEOS!!!</strong></Label>
            <Container
               className='challenge-videos-form-container'
               ref={videosContainerRef}
            >
               {
                  currentUsersVideos.map(({id, title, videoType, description, urlOrFile}, idx) => (
                     <VideoWrapper
                        key={idx}
                        video_component={
                           videoType == 'you-tube' ?
                              <YouTubeVideo title={title} url={urlOrFile} />
                              :
                              <UploadVideo file={urlOrFile} />
                        }
                        title={title}
                        description={description}
                        button_text={selectedVideos.includes(id) ? "UNSELECT THIS VIDEO" :"SELECT THIS VIDEO!!!"}
                        color = {selectedVideos.includes(id) ? 'danger' : 'success'}
                        clickLogic={
                           () => selectedVideos.includes(id) ?
                              setSelectedVideos(selectedVideos.filter(id => id != id))
                              :
                              setSelectedVideos(prv => ([...prv, id]))
                        }
                     />
                  ))
               }
            </Container>
         </FormGroup>
         <FormGroup>
            <Button type='button' color='danger' className='w-100' onClick={onHandleSubmitChallengeVideos}>FINISHED SELECTING VIDEOS.</Button>
         </FormGroup>
      </div>      
   )
}

export default AddChallengeVideos