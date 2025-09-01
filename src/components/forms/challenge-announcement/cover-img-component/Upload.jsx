import React, { useContext } from 'react'
import { ChallengeAnnouncementFormContext } from '../ChallengeAnnouncementFormComponent'
import { FormGroup, Input, Label } from 'reactstrap'

const Upload = () => {
   const { challengeAnnouncementDetails, setChallengeAnnouncementDetails } = useContext(ChallengeAnnouncementFormContext);

  return (
    <FormGroup>
      <Label for='upload'>UPLOAD YOUR COVER IMAGE.</Label>
      <Input type='file' value={challengeAnnouncementDetails.coverImageLink} placeholder='Upload Cover Image From Device' onChange={e => setChallengeAnnouncementDetails(prv => ({ ...prv, coverImageLink: e.target.files[0] }))} required />
    </FormGroup>
  )
}

export default Upload