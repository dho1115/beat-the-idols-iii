import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { DateTime } from 'luxon';
const Deadline = ({ challengeDetails, setChallengeDetails, ...args }) => {
   const currentDate = DateTime.local().toFormat('yyyy-MM-dd');
   const add5months = DateTime.local().plus({ months: 5 }).toFormat('yyyy-MM-dd');
   
   return (
      <FormGroup>
         <Label for='announcementDeadline'>SELECT A DEADLINE FOR PEOPLE TO APPLY.</Label>
         <Input type='date' id='announcementDeadline' value={challengeDetails.announcementDeadline} min={currentDate} max={add5months} onChange={e => setChallengeDetails(prv => ({...prv, announcementDeadline: e.target.value}))} required/>
      </FormGroup>
   )
}

export default Deadline