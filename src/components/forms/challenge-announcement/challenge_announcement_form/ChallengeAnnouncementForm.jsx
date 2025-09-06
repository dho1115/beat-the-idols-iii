import React, { useContext, useEffect } from 'react'
import { Form, FormGroup, Button, Input, Label } from 'reactstrap'
import { ChallengeDetailsContext } from '../../challenge/ChallengeFormComponent';

//Cover Image Components.
import { Online, Upload } from './CoverImgComponents';
import Deadline from '../../challenge/challenge_form/input_invite_others/Deadline';

import "./ChallengeAnnouncementForm.styles.css";

const ChallengeAnnouncementForm = () => {
   const { challengeAnnouncement, setChallengeAnnouncement } = useContext(ChallengeDetailsContext);

   return (
      <div className='challenge-announcement-details p-3 m-1'>
         <FormGroup>
            <Label for='title'>HEADLINE FOR YOUR ANNOUNCEMENT!!!</Label>
            <Input type='text' value={challengeAnnouncement.headline} placeholder='your headline will be shown in the card' maxLength={51} onChange={e => setChallengeAnnouncement(prv => ({...prv, headline: e.target.value}))} required />
         </FormGroup>
         <FormGroup>
            <Label for='description'>ANYTHING YOU WANT TO SAY ABOUT THIS ANNOUNCEMENT?.</Label>
            <Input type='textarea' value={challengeAnnouncement.description} placeholder='Description of your challenge' onChange={e => setChallengeAnnouncement(prv => ({...prv, description: e.target.value}))} />
         </FormGroup>
         <Deadline challengeAnnouncement={challengeAnnouncement} setChallengeAnnouncement={setChallengeAnnouncement} />
      </div>
   )
}

export default ChallengeAnnouncementForm