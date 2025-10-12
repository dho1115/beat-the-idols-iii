import React, { useContext, useLayoutEffect, useEffect, useRef, useState } from 'react';
import { Container } from 'reactstrap';

//Components.
import YouTubeVideo from '../../../templates/video/you_tube/YouTubeVideo'
import UploadVideo from '../../../templates/video/upload/UploadVideo'
import VideoWrapper from '../../../templates/video_wrapper/VideoWrapper'

//Context
import { dataContext } from '../../../../App';

import './ChallengeVideos.styles.css';

const MapCurrentUserVideos = ({ selectedVideos, setSelectedVideos }) => {
   const [selectedVideosIDList, setselectedVideosIDList] = useState(selectedVideos.map(val => val.id));

   const videosContainerRef = useRef();
   const { videos, currentUser } = useContext(dataContext);

   const currentUsersVideos = videos.filter(({ _userID }) => _userID == currentUser.id);

   useLayoutEffect(() => {
      const setGridTemplateColumns = currentUsersVideos.length >= 5 ?
         "auto auto auto auto auto"
         :
         currentUsersVideos.map(() => `${(100 / (currentUsersVideos.length))}%`).join(" ");
      
      videosContainerRef.current.style.gridTemplateColumns = setGridTemplateColumns
   }, []);

   useEffect(() => setselectedVideosIDList(selectedVideos.map(val => val.id)), [selectedVideos.length])

   return (
      <Container className='challenge-videos-form-container' ref={videosContainerRef}>
         {
            currentUsersVideos.map(({id, title, videoType, description, record, urlOrFile, username}, idx) => (
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
                  button_text={selectedVideosIDList.includes(id) ? "UNSELECT THIS VIDEO" :"SELECT THIS VIDEO!!!"}
                  color = {selectedVideosIDList.includes(id) ? 'danger' : 'success'}
                  clickLogic={
                     () => selectedVideosIDList.includes(id) ?
                        setSelectedVideos(selectedVideos.filter(selectedVideo => selectedVideo.id != id)) //unselect video.
                        :
                        setSelectedVideos(prv => ([...prv, { id, urlOrFile, title, record, username, challengeAccessories: { votes: 0, finalStatus: 'pending' } }])) //select video.
                  }
               />
            ))
         }
      </Container>
   )
}

export default MapCurrentUserVideos