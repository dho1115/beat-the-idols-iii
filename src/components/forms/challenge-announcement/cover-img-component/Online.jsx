import React, { useContext } from 'react';
import { ChallengeAnnouncementFormContext } from '../ChallengeAnnouncementFormComponent';
import { FormGroup, Input, Label } from 'reactstrap';

const Online = () => {
   const { challengeAnnouncementDetails, setChallengeAnnouncementDetails } = useContext(ChallengeAnnouncementFormContext);
  return (
    <FormGroup>
      <Label for='online'>COPY IMAGE ADDRESS ONLINE & PASTE IMAGE ADDRESS BELOW.</Label>
      <Input type='text' value={challengeAnnouncementDetails.coverImageLink} placeholder='Paste (online) image address here.' onChange={e => setChallengeAnnouncementDetails(prv => ({...prv, coverImageLink: e.target.value}))} />
    </FormGroup>
  )
}

export default Online