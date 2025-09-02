import React, { useContext } from 'react'
import { Form, FormGroup, Button, Input, Label } from 'reactstrap'
import { ChallengeAnnouncementFormContext } from '../ChallengeAnnouncementFormComponent';

//Cover Image Components.
import { Online, Upload } from './CoverImgComponents';

import "./ChallengeAnnouncementForm.styles.css";

const ChallengeAnnouncementForm = () => {
   const { challengeAnnouncementDetails, setChallengeAnnouncementDetails } = useContext(ChallengeAnnouncementFormContext);

   return (
      <>
         <FormGroup>
            <Label for='title'>ANNOUNCEMENT HEADLINE!!!</Label>
            <Input type='text' value={challengeAnnouncementDetails.title} placeholder='This will be shown in the card' maxLength={51} onChange={e => setChallengeAnnouncementDetails(prv => ({...prv, title: e.target.value}))} required />
         </FormGroup>
         <FormGroup>
            <Label for='description'>DETAILS OF YOUR CHALLENGE (BODY).</Label>
            <Input type='textarea' value={challengeAnnouncementDetails.description} placeholder='Description of your challenge' onChange={e => setChallengeAnnouncementDetails(prv => ({...prv, description: e.target.value}))} />
         </FormGroup>
         <FormGroup tag={'fieldset'}>
            <legend>SOURCE OF YOUR COVER IMAGE?</legend>
            <FormGroup check>
               <Input type='radio' name='coverImageSource' value={challengeAnnouncementDetails.coverImageSource} required onChange={() => setChallengeAnnouncementDetails(prv => ({...prv, coverImageSource: 'online'}))} /> {' '} <Label check>ONLINE</Label>
            </FormGroup>
            <FormGroup check>
               <Input type='radio' name='coverImageSource' value={challengeAnnouncementDetails.coverImageSource} required onChange={() => setChallengeAnnouncementDetails(prv => ({...prv, coverImageSource: 'upload'}))} /> {' '} <Label check>UPLOAD</Label>
            </FormGroup>
         </FormGroup>
         {
            challengeAnnouncementDetails.coverImageSource == "online" && <Online />
         }
         {
            challengeAnnouncementDetails.coverImageSource == "upload" && <Upload />
         }
         <FormGroup>
            <Button type='submit' color='danger' size='lg' className='w-100'>SUBMIT!!!</Button>
         </FormGroup>
      </>
   )
}

export default ChallengeAnnouncementForm