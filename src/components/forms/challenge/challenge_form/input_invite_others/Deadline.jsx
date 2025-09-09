import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { DateTime } from 'luxon';


const Deadline = ({ challengeAnnouncement, setChallengeAnnouncement, ...args }) => {
   const { setChallengeDetails } = args;
   const currentDate = DateTime.local().toFormat('yyyy-MM-dd');
   const add5months = DateTime.local().plus({ months: 5 }).toFormat('yyyy-MM-dd');
   
   return (
      <FormGroup>
         <Label for='announcementDeadline'>SELECT A DEADLINE FOR PEOPLE TO SEND THEIR VIDEOS.</Label>
         <Input type='date' id='announcementDeadline' value={challengeAnnouncement.announcementEndsOn} min={currentDate} max={add5months} onChange={e => {
            setChallengeDetails(prv => ({...prv, challengeEndsOn: "0000-00-00"})) //resetting challenge details IF user changes deadline.
            setChallengeAnnouncement(prv => ({...prv, announcementEndsOn: e.target.value}))
         }} required/>
      </FormGroup>
   )
}

export default Deadline