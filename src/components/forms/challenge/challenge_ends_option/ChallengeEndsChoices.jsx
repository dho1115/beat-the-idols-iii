import React, { useContext, useEffect } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import { DateTime } from 'luxon';

//Components.
import WinningVotesOption from './WinningVotesOption'
import ExpirationDateOption from './ExpirationDateOption'

//Contexts.
import { ChallengeDetailsContext } from '../ChallengeFormComponent';


const ChallengeEndsChoices = () => {
   const { challengeDetails, setChallengeDetails} = useContext(ChallengeDetailsContext);

   // const setDefaultExpirationDate = () => {
   //    const announcementDeadline = challengeAnnouncement.announcementEndsOn;
   //    const announcementDeadlineToISO = DateTime.fromISO(announcementDeadline);
   //    return announcementDeadlineToISO.plus({months: 5}).toFormat('yyyy-MM-dd')
   // } //If the user selects votes.

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