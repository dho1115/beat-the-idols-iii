import React, { useContext } from 'react'
import { Container, FormGroup } from 'reactstrap';
import { ChallengeDetailsContext } from '../ChallengeForm';
import { dataContext } from '../../../../App';
import ErrorBoundary from '../../../ErrorBoundary';
import UploadVideo from '../../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../../templates/video/you_tube/YouTubeVideo';

import "./ChallengeVideos.styles.css";

const ChallengeVideos = () => {
   const { videos } = useContext(dataContext);
   const { setChallengeDetails } = useContext(ChallengeDetailsContext);

   console.log({ videos });

   const onHandleSubmitChallengeVideos = e => {
      e.preventDefault();
   }

   return (
      <FormGroup>
         <Label><strong>SELECT CHALLENGE VIDEOS!!!</strong></Label>
         <Container>
            
         </Container>
      </FormGroup>
   )
}

export default ChallengeVideos