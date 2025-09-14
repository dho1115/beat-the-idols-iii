import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

//Context
import { dataContext } from '../../../App';

import "../Challenges.styles.css";

const AnnouncementDetailsComponent = () => {
   const { user, id } = useParams();
   const { challengeAnnouncements, allUsers } = useContext(dataContext);

   const [announcement, setAnnouncement] = useState({})
   const [actualChallenge, setActualChallenge] = useState({})

   const announcementDetails = challengeAnnouncements.find(({ announcement: { _challengeAnnouncementID } }) => _challengeAnnouncementID == id)

   const announcementOwner = allUsers.find(val => val.id == user);

   console.log({ announcementDetails });
   debugger;

   useEffect(() => {
      setAnnouncement(prv => ({ ...prv, ...announcementDetails.announcement, owner: announcementOwner.username }));
      setActualChallenge(prv => ({...prv, ...announcementDetails.challenge}))
   }, [])
   
   return (
      <div className='m-1 p-1'>
         <header>
            <h3>CHALLENGE #{id} OWNED BY {announcement.owner}.</h3>
         </header>
         <div className='announcementDetailsProfile w-100'>
            <div className='m-1'>
               <h3>Owner: <strong className='text-danger'>{announcement.owner}</strong>.</h3>
               <hr />
               <h5>Description: <strong className='text-danger'>{announcement.description}</strong>.</h5>
            </div>
            <div className='announcementDetailsCoverImg'>
               <img src={announcement.cover_img} className='img-fluid'/>
            </div>
         </div>
         <Container>
            <strong>{JSON.stringify(JSON.stringify(announcementDetails.announcement))}</strong>
            <headline className='p-3'>
               <h3>VIDEOS CURRENTLY IN THIS CHALLENGE:</h3>
            </headline>
            <Container>
               <h3>{actualChallenge.challengeVideos}</h3>
            </Container>
            <Button color='danger' size='lg'><strong>JOIN THIS CHALLENGE!!!</strong></Button>
         </Container>
      </div>
   )
}

export default AnnouncementDetailsComponent