import React, { useContext, useState, useEffect, useRef } from 'react'
import { ChallengeAnnouncementFormContext } from '../ChallengeAnnouncementFormComponent'
import { dataContext } from '../../../../App';
import { Button, Container } from 'reactstrap';

import "../ChallengeAnnouncementFormComponent.styles.css";

const SelectVideosComponent = () => {
   const { challengeVideos, setChallengeVideos } = useContext(ChallengeAnnouncementFormContext);
   const { videos, setVideos, currentUser } = useContext(dataContext);
   const videosRef = useRef();
   const [currentUserVideos, setcurrentUserVideos] = useState([])

   useEffect(() => {
      setcurrentUserVideos(prv => ([...prv, ...videos.filter(({ _userID }) => _userID == currentUser.id)]))
         
      return () => setcurrentUserVideos([])
   }, [])

   useEffect(() => {
      if (challengeVideos.length) {
         const setGridTemplateColumns =
            currentUserVideos.length > 4 ?
               currentUserVideos.map(video => "auto").join(" ")
               :
               currentUserVideos.map((videos, idx, arr) => `${(100 / arr.length) - 1}%`).join(" ");
         videosRef.current.style.gridTemplateColums = setGridTemplateColumns
      }
   }, [challengeVideos])

   const mapUsersVideos = currentUserVideos.map(({ video }, idx) => (
      <div key={idx} style={{overflowWrap: 'anywhere', border: '1.5px solid black', backgroundColor: 'lightyellow'}} className='m-3 p-1'>
         <strong>{JSON.stringify(video)}</strong>
         <div>
            <Button color='danger'>SELECT THIS VIDEO!!!</Button>
         </div>
      </div>
   ));

   return (
      <Container challenge-announcement-video-container>
         <div className='challenge-announcement-video-div p-1' ref={videosRef}>
            {mapUsersVideos}
         </div>
         <div>
            <Button color='danger' className='w-100'>DONE SELECTING VIDEOS!!!</Button>
         </div>
      </Container>
   )
}

export default SelectVideosComponent