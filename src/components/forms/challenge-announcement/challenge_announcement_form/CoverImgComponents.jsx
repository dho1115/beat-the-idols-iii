import React, { useContext } from 'react';
import { ChallengeAnnouncementFormContext } from '../ChallengeAnnouncementFormComponent';
import { FormGroup, Input, Label } from 'reactstrap';

export const Online = () => {
   const { challengeAnnouncementDetails, setChallengeAnnouncementDetails } = useContext(ChallengeAnnouncementFormContext);
   
   return (
      <FormGroup>
         <Label for='online'>COPY IMAGE ADDRESS ONLINE & PASTE IMAGE ADDRESS BELOW.</Label>
         <Input type='text' value={challengeAnnouncementDetails.coverImageLink} placeholder='Paste (online) image address here.' onChange={e => setChallengeAnnouncementDetails(prv => ({...prv, coverImageLink: e.target.value}))} />
      </FormGroup>
   )
} //Online.

export const Upload = () => {
   const { challengeAnnouncementDetails, setChallengeAnnouncementDetails } = useContext(ChallengeAnnouncementFormContext);

  return (
    <FormGroup>
      <Label for='upload'>UPLOAD YOUR COVER IMAGE.</Label>
      <Input type='file' value={challengeAnnouncementDetails.coverImageLink} placeholder='Upload Cover Image From Device' onChange={e => setChallengeAnnouncementDetails(prv => ({ ...prv, coverImageLink: e.target.files[0] }))} required />
    </FormGroup>
  )
} //Upload.
