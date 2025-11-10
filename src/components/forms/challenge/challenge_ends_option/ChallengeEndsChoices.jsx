import React, { useContext, useEffect } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import { DateTime } from 'luxon';

//Components.
import WinningVotesOption from './WinningVotesOption'
import ExpirationDateOption from './ExpirationDateOption'

//Contexts.
import { ChallengeDetailsContext } from '../ChallengeFormComponent';

const ChallengeEndsChoices = () => {
   const { challengeDetails, setChallengeDetails, challengeAnnouncement, setChallengeAnnouncement } = useContext(ChallengeDetailsContext);

   const announcementEndDate = challengeAnnouncement.announcementEndsOn;
   const defaultActiveChallengeEndDate = DateTime.fromISO(announcementEndDate).plus({ months: 5 }).toFormat('yyyy-MM-dd');

   return (
      <FormGroup tag="fieldset">
         <legend>HOW DO YOU WANT YOUR CHALLENGE TO END?</legend>
         <FormGroup check>
            <Label for='date' check><strong>DATE</strong></Label>{' '}<Input type='radio' id='date' name='end-conditions' value={challengeDetails.howChallengeEnds} onChange={() => setChallengeDetails(prv => ({...prv, howChallengeEnds: 'date'}))}/>
         </FormGroup>
         <FormGroup check>
            <Label for='votes' check><strong>VOTES</strong></Label>{' '}<Input type='radio' name='end-conditions' value={challengeDetails.howChallengeEnds} onChange={() => setChallengeDetails(prv => ({...prv, howChallengeEnds: 'votes', challengeEndsOn: defaultActiveChallengeEndDate}))}/>
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