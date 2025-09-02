import React, { useContext } from 'react';
import { ChallengeDetailsContext } from '../ChallengeFormComponent';
import { DateTime } from 'luxon';
import { FormGroup, Label, Input } from 'reactstrap';

const ExpirationDateOption = () => {
  const { challengeDetails, setChallengeDetails, challengeAnnouncement } = useContext(ChallengeDetailsContext)
  
  const challengeExpiration = () => {
    if (challengeDetails.challengeAnouncementID) {
      const deadlineString = challengeAnnouncement.announcementEndsOn;
      const ISOmin = DateTime.fromISO(deadlineString)
      const min = ISOmin.plus({ days: 3 }).toFormat('yyyy-MM-dd');
      const max = ISOmin.plus({ months: 5 }).toFormat('yyyy-MM-dd');
      return { min, max };
    }

    const min = DateTime.local().plus({ days: 3 }).toFormat("yyyy-MM-dd");
    const max = DateTime.local().plus({ months: 5 }).toFormat("yyyy-MM-dd");

    return { min, max };
  }

  return (
    <FormGroup>
        <Label for='endbydate'><strong>CHALLENGE END DATE</strong></Label>
        <Input type='date' id='endbydate' min={challengeExpiration().min} max={challengeExpiration().max} placeholder='Select a date for when your challenge ends' onChange={e => setChallengeDetails(prv => ({...prv, challengeExpires: e.target.value}))} required />
      </FormGroup>
  )
}

export default ExpirationDateOption