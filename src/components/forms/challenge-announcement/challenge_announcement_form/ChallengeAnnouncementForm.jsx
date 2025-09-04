import React, { useContext } from 'react'
import { Form, FormGroup, Button, Input, Label } from 'reactstrap'
import { ChallengeAnnouncementFormContext } from '../ChallengeAnnouncementFormComponent';

//Cover Image Components.
import { Online, Upload } from './CoverImgComponents';
import Deadline from '../../challenge/challenge_form/input_invite_others/Deadline';

import "./ChallengeAnnouncementForm.styles.css";

const ChallengeAnnouncementForm = () => {
   const { challengeAnnouncementDetails, setChallengeAnnouncementDetails } = useContext(ChallengeAnnouncementFormContext);

   return (
      <>
         <FormGroup>
            <Label for='title'>HEADLINE FOR YOUR ANNOUNCEMENT!!!</Label>
            <Input type='text' value={challengeAnnouncementDetails.title} placeholder='your headline will be shown in the card' maxLength={51} onChange={e => setChallengeAnnouncementDetails(prv => ({...prv, title: e.target.value}))} required />
         </FormGroup>
         <FormGroup>
            <Label for='description'>ANYTHING YOU WANT TO SAY ABOUT THIS ANNOUNCEMENT?.</Label>
            <Input type='textarea' value={challengeAnnouncementDetails.description} placeholder='Description of your challenge' onChange={e => setChallengeAnnouncementDetails(prv => ({...prv, description: e.target.value}))} />
         </FormGroup>
         <Deadline />
         {/* <FormGroup tag={'fieldset'}>
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
         </FormGroup> */} {/* DELETING THIS FROM CHALLENGE ANNOUNCEMENT. I PLAN TO MOVE CHALLENGE ANNOUNCEMENT INTO THE CHALLENGE SECTION. */}
      </>
   )
}

export default ChallengeAnnouncementForm