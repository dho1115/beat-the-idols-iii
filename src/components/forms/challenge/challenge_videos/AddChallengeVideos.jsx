import React, { useContext, useState } from 'react'
import { Form, Label, Button, Container, FormGroup } from 'reactstrap';
import { ChallengeDetailsContext } from '../ChallengeFormComponent';
import { dataContext } from '../../../../App';
import ErrorBoundary from '../../../ErrorBoundary';
import UploadVideo from '../../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../../templates/video/you_tube/YouTubeVideo';

import "./ChallengeVideos.styles.css";

const AddChallengeVideos = () => {
   const [selectedVideos, setSelectedVideos] = useState([])
   const { videos } = useContext(dataContext);
   const { setChallengeDetails } = useContext(ChallengeDetailsContext);

   const onHandleSubmitChallengeVideos = e => {
      e.preventDefault();
   }

   return (
      <Form className="challenge-videos-form p-3 m-3">
         <FormGroup>
            <Label><strong>SELECT CHALLENGE VIDEOS!!!</strong></Label>
            <Container className='challenge-videos-form-container'>
               {
                  videos.map((val, idx) => (
                     <div key={idx} className='p-1 m-1' style={{border: `5px solid ${idx%2==1 ? "#333" : "red"}`, backgroundColor: idx%2==1 ? 'beige' : 'floralwhite', overflow: "scroll", textWrap: 'pretty'}}>
                        <h5>{JSON.stringify(val)}</h5>
                        <Button color={selectedVideos.includes(val.id) ? "danger" : "success"} className='w-100' size='lg' onClick={() => selectedVideos.includes(val.id) ? setSelectedVideos(selectedVideos.filter(id => id != val.id)) : setSelectedVideos(prv=> ([...prv, val.id]))}>{selectedVideos.includes(val.id) ? "UNSELECT THIS VIDEO" : "SELECT THIS VIDEO!!!"}</Button>
                     </div>
                  ))
               }
            </Container>
         </FormGroup>
      </Form>      
   )
}

export default AddChallengeVideos