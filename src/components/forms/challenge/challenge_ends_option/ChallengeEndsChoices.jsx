import React, { useContext, useEffect } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

//Components.
import WinningVotesOption from './WinningVotesOption'
import ExpirationDateOption from './ExpirationDateOption'

import { ChallengeDetailsContext } from '../ChallengeFormComponent'

const ChallengeEndsChoices = () => {
   const { challengeDetails, setChallengeDetails } = useContext(ChallengeDetailsContext);

   return (
      <FormGroup tag="fieldset">
         <legend>HOW DO YOU WANT YOUR CHALLENGE TO END?</legend>
         <FormGroup check>
            <Label for='date' check><strong>DATE</strong></Label>{' '}<Input type='radio' id='date' name='end-conditions' value={challengeDetails.howChallengeEnds} onChange={() => setChallengeDetails(prv => ({...prv, howChallengeEnds: 'date'}))}/>
         </FormGroup>
         <FormGroup check>
            <Label for='votes' check><strong>VOTES</strong></Label>{' '}<Input type='radio' name='end-conditions' value={challengeDetails.howChallengeEnds} onChange={() => setChallengeDetails(prv => ({...prv, howChallengeEnds: 'votes'}))}/>
         </FormGroup>
         {
            challengeDetails.howChallengeEnds == 'date' && <ExpirationDateOption />
         }
         {
            challengeDetails.howChallengeEnds == 'votes' && <WinningVotesOption />
         }
      </FormGroup>
   )
}

export default ChallengeEndsChoices