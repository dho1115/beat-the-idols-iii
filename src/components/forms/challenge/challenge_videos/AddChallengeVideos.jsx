import React, { useContext, useEffect, useState, useRef } from 'react'
import { Form, Label, Button, Container, FormGroup, Alert } from 'reactstrap';
import { ChallengeDetailsContext } from '../ChallengeFormComponent';
import { dataContext } from '../../../../App';
import UploadVideo from '../../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../../templates/video/you_tube/YouTubeVideo';

import "./ChallengeVideos.styles.css";

const AddChallengeVideos = () => {
   const videosContainerRef = useRef();
   const [selectedVideos, setSelectedVideos] = useState([])
   const [addVideoAlert, setAddVideoAlert] = useState(false)
   const { videos } = useContext(dataContext);
   const { challengeDetails, setChallengeDetails } = useContext(ChallengeDetailsContext);

   const onHandleSubmitChallengeVideos = e => {
      e.preventDefault();
      console.log("About to submit:", selectedVideos);
      if (!selectedVideos.length) {
         setAddVideoAlert(true)
      }
      setChallengeDetails(prv => ({ ...prv, challengeVideos: [...challengeDetails.challengeVideos, ...selectedVideos] }));
   }

   useEffect(() => {
      const setGridTemplateColumns = videos.length >= 5 ?
         "auto auto auto auto auto"
         :
         videos.map(val => `${(100/(videos.length))}%`).join(" ");

      videosContainerRef.current.style.gridTemplateColumns = setGridTemplateColumns
      return () => {
         setSelectedVideos([])
         setAddVideoAlert(false)
      }
   }, [])

   return (
      <div className="challenge-videos-form p-3 m-3">
         {
            addVideoAlert && <Alert color='danger'><h3>PLEASE SELECT AT LEAST 1 VIDEO (you currently have {selectedVideos.length} videos)!!!</h3></Alert>
         }
         <FormGroup>
            <Label><strong>SELECT CHALLENGE VIDEOS!!!</strong></Label>
            <Container
               className='challenge-videos-form-container'
               ref={videosContainerRef}
            >
               {
                  videos.map(({id, title, videoType, description, urlOrFile}, idx) => (
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
                        className='w-100'
                        size='lg'
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