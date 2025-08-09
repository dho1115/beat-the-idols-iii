import React, { useContext } from 'react'
import { Container, FormGroup } from 'reactstrap'
import UploadVideo from '../../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../../templates/video/you_tube/YouTubeVideo';
import { dataContext } from '../../../../App';

import "./ChallengeVideos.styles.css";

const ChallengeVideos = () => {
   const { videos } = useContext(dataContext);
   console.log({ videos });

   return (
      <FormGroup>
         <Label><strong>SELECT CHALLENGE VIDEOS!!!</strong></Label>
         <Container>
            
         </Container>
      </FormGroup>
   )
}

export default ChallengeVideos