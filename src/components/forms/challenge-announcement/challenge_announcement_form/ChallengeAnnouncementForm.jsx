import React, { useContext } from 'react'
import { Form, FormGroup, Button, Input, Label } from 'reactstrap'
import { ChallengeAnnouncementFormContext } from '../ChallengeAnnouncementFormComponent';

import "./ChallengeAnnouncementForm.styles.css";

const ChallengeAnnouncementForm = () => {
   const { challengeAnnouncementDetails, setChallengeAnnouncementDetails } = useContext(ChallengeAnnouncementFormContext);

   return (
      <>
         <FormGroup>
            <Label for='title'>TITLE FOR YOUR ANNOUNCEMENT!!!</Label>
            <Input type='text' placeholder='This will be shown in the card' maxLength={51} onChange={e => setChallengeAnnouncementDetails(prv => ({...prv, title: e.target.value}))} required />
         </FormGroup>
         <FormGroup>
            <Label for='description'>BRIEF DESCRIPTON OF YOUR CHALLENGE.</Label>
            <Input type='textarea' placeholder='Description of your challenge' onChange={e => setChallengeAnnouncementDetails(prv => ({...prv, description: e.target.value}))} />
         </FormGroup>
         <FormGroup tag={'fieldset'}>
            <legend>WHERE WILL THE FRONT COVER IMAGE FOR YOUR CHALLENGE COME FROM?</legend>
            <FormGroup check>
               <Input type='radio' name='coverImageSource' value={challengeAnnouncementDetails.coverImageSource} required onChange={() => setChallengeAnnouncementDetails(prv => ({...prv, coverImageSource: 'you-tube'}))} /> {' '} <Label check>YOU-TUBE</Label>
            </FormGroup>
            <FormGroup check>
               <Input type='radio' name='coverImageSource' value={challengeAnnouncementDetails.coverImageSource} required onChange={() => setChallengeAnnouncementDetails(prv => ({...prv, coverImageSource: 'upload'}))} /> {' '} <Label check>UPLOAD</Label>
            </FormGroup>
         </FormGroup>
         <FormGroup>
            <Button type='submit' color='danger' size='lg'>SUBMIT!!!</Button>
         </FormGroup>
      </>
   )
}

export default ChallengeAnnouncementForm