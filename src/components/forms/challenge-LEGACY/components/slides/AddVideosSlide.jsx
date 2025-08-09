import React, { Suspense, useContext } from 'react'
import { Container } from 'reactstrap';
import { dataContext } from '../../../../../App'
import SuspenseFallback from '../../../../suspense_fallback/SuspenseFallback';
import ErrorBoundary from '../../../../ErrorBoundary';
import VideoWrapper from '../../../../templates/video_wrapper/VideoWrapper';
import UploadVideo from '../../../../templates/video/upload/UploadVideo';
import YouTubeVideo from '../../../../templates/video/you_tube/YouTubeVideo';

import "./Slide.styles.css";

const AddVideosSlide = () => {
   const { videos } = useContext(dataContext);
   const challengeVideos = videos.map(({ id, _userID, posted, title, urlOrFile, username, videoType }, idx) => (
      <VideoWrapper
         video_component={
            videoType == 'you-tube' ?
               <YouTubeVideo url={urlOrFile} />
               :
               <UploadVideo file={urlOrFile} />
         }
         posted={posted}
         title={title}
         idx={idx}
         _userID={_userID}
         username={username}
         button_text="SELECT THIS VIDEO!!!"
         clickLogic={() => alert(`Selected video id ${id}, ${title}. The username is ${username}(${_userID}).`)}
      />
   ));
   console.log("===== challenge videos. =====")
   console.log({ challengeVideos });
   console.log("=============================")

   return (
      <div className='slide-div'>
         <Container className='m-0 add-videos-slide-container'>
            <ErrorBoundary fallback={<h3 className='text-danger'>Problem inside AddVideosSlide.jsx</h3>}>
               <Suspense fallback={<SuspenseFallback />}>
                  {challengeVideos.map(val => val)}
               </Suspense>
            </ErrorBoundary>
         </Container>
      </div>
   )
}

export default AddVideosSlide