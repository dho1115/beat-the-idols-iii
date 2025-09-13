import React from 'react';
import { Alert, FormGroup, Input, Label } from 'reactstrap';
import { DateTime } from 'luxon';

const Deadline = ({ challengeAnnouncement, setChallengeAnnouncement, ...args }) => {
   const { challengeDetails, setChallengeDetails, dateAlert, setDateAlert } = args;
   const currentDate = DateTime.local().toFormat('yyyy-MM-dd');
   const add5months = DateTime.local().plus({ months: 5 }).toFormat('yyyy-MM-dd');

   const challengeAnnouncementDeadlineLogic = e => {
      ((e.target.value > challengeDetails.challengeExpires) && (challengeDetails.challengeExpires != '0000-00-00')) ? setDateAlert(true) : setDateAlert(false);

      setChallengeAnnouncement(prv => ({ ...prv, announcementEndsOn: e.target.value }))
   }
   
   return (
      <FormGroup>
         {
            dateAlert && <Alert color='danger'><strong>Your announcement end date of {challengeAnnouncement.announcementEndsOn} <i>CANNOT</i> be greater than your actual challenge expiration date of {challengeDetails.challengeExpires}</strong></Alert>
         }
         <Label for='announcementDeadline'>SELECT A DEADLINE FOR PEOPLE TO SEND THEIR VIDEOS.</Label>
         <Input type='date' id='announcementDeadline' value={challengeAnnouncement.announcementEndsOn} min={currentDate} max={add5months} onChange={challengeAnnouncementDeadlineLogic} required/>
      </FormGroup>
   )
}

export default Deadline