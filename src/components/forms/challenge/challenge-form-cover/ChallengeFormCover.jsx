import React, { useContext } from 'react'
import { Input, Label, Button, FormGroup } from 'reactstrap';

import { ChallengeDetailsContext } from '../ChallengeFormComponent';

const OnlineImage = ({challengeCoverImage, setstate}) => {
  return (
    <FormGroup>
      <Label for='url'>COPY 'IMAGE ADDRESS' FROM ONLINE VIDEO & PASTE BELOW.</Label>
      <Input type='text' id='url' value={challengeCoverImage} onChange={setstate} placeholder="Right click online photo, select 'Copy Image Address' & paste here." required />
    </FormGroup>
  )
}

const ComputerUpload = ({challengeCoverImage, setstate}) => {
  return (
    <FormGroup>
      <Label for='upload'>UPLOAD IMAGE FROM YOUR COMPUTER TO BE USED FOR YOUR COVER.</Label>
      <Input type='file' id='upload' value={challengeCoverImage} onChange={setstate} required />
    </FormGroup>
  )
}

const ChallengeFormCover = () => {
   const { challengeDetails, setChallengeDetails } = useContext(ChallengeDetailsContext);

   return (
      <>
         <FormGroup tag='fieldset'>
            <legend>Where Do You Plan To Get The Cover Image For Your Challenge?</legend>
            <FormGroup check>
               <Input name='coverImage' type='radio' value={challengeDetails.challengeCoverType} onChange={() => setChallengeDetails(prv => ({...prv, challengeCoverType: 'online'}))} required /> {' '} <Label check>ONLINE IMAGE.</Label>
            </FormGroup>
            <FormGroup check>
               <Input name='coverImage' type='radio' value={challengeDetails.challengeCoverType} onChange={() => setChallengeDetails(prv => ({...prv, challengeCoverType: 'upload'}))} /> {' '} <Label check>COMPUTER UPLOAD.</Label>
            </FormGroup>
         </FormGroup>
         {
            challengeDetails.challengeCoverType == 'online' ?
               <OnlineImage
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