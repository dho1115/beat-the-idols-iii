import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { DateTime } from 'luxon';
const Deadline = ({ challengeDetails, setChallengeDetails, ...args }) => {
   const currentDate = DateTime.now();
   console.log({ currentDate });
   return (
      <FormGroup>
         <Label for='deadline'>SELECT A DEADLINE FOR PEOPLE TO APPLY.</Label>
         <Input type='date' id='deadline' value={challengeDetails.Deadline} onChange={e => setChallengeDetails(prv => ({...prv, deadline: e.target.value}))} required/>
      </FormGroup>
   )
}

export default Deadline