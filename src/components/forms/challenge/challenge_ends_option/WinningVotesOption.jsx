import React, { useContext } from 'react';

import { FormGroup, Label, Input } from 'reactstrap';
import { ChallengeDetailsContext } from '../ChallengeFormComponent';

const WinningVotesOption = () => {
  const { challengeDetails, setChallengeDetails } = useContext(ChallengeDetailsContext);
  
  return (
    <FormGroup>
      <Label for='votes'>THE CHALLENGE ENDS WHEN THE WINNER GETS HOW MANY VOTES?</Label>
      <Input type='number' value={challengeDetails.winningVotes} placeholder='First To Reach This Number of Votes Wins!!!' min={5} max={105} onChange={e => setChallengeDetails(prv => ({...prv, winningVotes: e.target.value}))} />
    </FormGroup>
  )
}

export default WinningVotesOption