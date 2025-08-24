import React, { useContext } from 'react'
import { Input, Label, Button, FormGroup } from 'reactstrap';

import { ChallengeDetailsContext } from '../ChallengeFormComponent';

const YouTubeURLInput = ({challengeCoverImage, setstate}) => {
  return (
    <>
      <Label for='url'>COPY/PASTE YOUTUBE URL</Label>
      <Input type='text' id='url' value={challengeCoverImage} onChange={setstate} placeholder='You-Tube URL' required />
    </>
  )
}

const ComputerUpload = ({challengeCoverImage, setstate}) => {
  return (
    <>
      <Label for='upload'>UPLOAD FILE</Label>
      <Input type='file' id='upload' value={challengeCoverImage} onChange={setstate} required />
    </>
  )
}

const ChallengeFormCover = () => {
   const { challengeDetails, setChallengeDetails } = useContext(ChallengeDetailsContext);

   return (
      <>
         <FormGroup tag='fieldset'>
            <legend>Where Will You Get Your Video (type)?</legend>
            <FormGroup check>
               <Input name='videoType' type='radio' value={challengeDetails.challengeCoverType} onChange={() => setChallengeDetails(prv => ({...prv, challengeCoverType: 'you-tube'}))} required /> {' '} <Label check>FROM YOU-TUBE.</Label>
            </FormGroup>
            <FormGroup check>
               <Input name='videoType' type='radio' value={challengeDetails.challengeCoverType} onChange={() => setChallengeDetails(prv => ({...prv, challengeCoverType: 'upload'}))} /> {' '} <Label check>COMPUTER UPLOAD.</Label>
            </FormGroup>
         </FormGroup>
         {
            challengeDetails.challengeCoverType == 'you-tube' ?
               <YouTubeURLInput
                  challengeCoverImage={challengeDetails.challengeCoverImage}
                  setstate={e => setChallengeDetails(prv => ({ ...prv, challengeCoverImage: e.target.value }))} 
               />
               :
               <ComputerUpload
                  challengeCoverImage={challengeDetails.challengeCoverImage}
                  setstate={e => setChallengeDetails(prv => ({ ...prv, challengeCoverImage: e.target.files[0] }))}
               />
         }
         <FormGroup>
            <Button type='submit' className='w-100' color='danger'>SUBMIT MY CHALLENGE!!!</Button>
         </FormGroup>
      </>
   )
}

export default ChallengeFormCover