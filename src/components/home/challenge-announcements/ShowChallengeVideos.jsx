import React from 'react'
import { Container } from 'reactstrap';

//Components:
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';
import UploadVideo from '../../templates/video/upload/UploadVideo';

import "../Challenges.styles.css"

const ShowChallengeVideos = ({videosInChallenge}) => {
  return (
    <Container className="announcement-videos-container p-3">
      {
         videosInChallenge.map(({ title, description, videoType, urlOrFile, username }, idx) => (
            <VideoWrapper
               key={idx}
               color={idx%2==1 ? "red" : "yellow"}
               title={title}
               description={description}
               video_component={
                  videoType == 'you-tube' ?
                     <YouTubeVideo url={urlOrFile} title={title} />
                     :
                     <UploadVideo file={urlOrFile} />
               }
               username={username}
               button_text={null}
               clickLogic={false}
            />
         ))
      }
    </Container>
  )
}

export default ShowChallengeVideos