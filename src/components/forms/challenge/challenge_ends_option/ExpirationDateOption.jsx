import React, { useContext } from 'react';
import { ChallengeDetailsContext } from '../ChallengeFormComponent';
import { DateTime } from 'luxon';
import { FormGroup, Label, Input } from 'reactstrap';

const ExpirationDateOption = () => {
  const { challengeDetails, setChallengeDetails, challengeAnnouncement, setDateAlert } = useContext(ChallengeDetailsContext)
  
  const challengeExpirationDate = () => {
    if (challengeDetails.challengeAnnouncementID) {
      const deadlineString = challengeAnnouncement.announcementEndsOn;
      const ISOmin = DateTime.fromISO(deadlineString) //convert deadlineString to DataTime.
      const min = ISOmin.plus({ days: 3 }).toFormat('yyyy-MM-dd');
      const max = ISOmin.plus({ months: 5 }).toFormat('yyyy-MM-dd');
      return { min, max };
    }

    const min = DateTime.local().plus({ days: 3 }).toFormat("yyyy-MM-dd");
    const max = DateTime.local().plus({ months: 5 }).toFormat("yyyy-MM-dd");
    return { min, max };
  }

  const challengeExpirationLogic = e => {
    e.target.value != '0000-00-00' && setDateAlert(false);
    (e.target.value <= challengeAnnouncement.announcementEndsOn) ? setDateAlert(true) : setDateAlert(false)
    setChallengeDetails(prv => ({ ...prv, challengeEndsOn: e.target.value }));
  }

  return (
    <FormGroup>
      <Label for='endbydate'><strong>CHALLENGE END DATE</strong></Label>
      <Input type='date' id='endbydate' min={challengeExpirationDate().min} max={challengeExpirationDate().max} placeholder='Select a date for when your challenge ends' onChange={challengeExpirationLogic} required />
    </FormGroup>
  )
}

export default ExpirationDateOption