import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { ChallengeDetailsContext } from '../ChallengeFormComponent';
import { dataContext } from '../../../../App';

//Modules-Components.
import Deadline from './input_invite_others/Deadline';
import ExpirationDateOption from '../challenge_ends_option/ExpirationDateOption';
import WinningVotesOption from '../challenge_ends_option/WinningVotesOption';

import './ChallengeForm.styles.css';

const ChallengeForm = () => {
  const navigate = useNavigate();
  const { challengeDetails, setChallengeDetails, setChallengeAnnouncement, _challengeID } = useContext(ChallengeDetailsContext);
  const { currentUser } = useContext(dataContext);

  const onButtonClick = () => navigate(`/currentUser/${currentUser.id}/challenge-form/add-video`, { state: { from: "ChallengeForm.jsx" } });

  return (
    <>
      <FormGroup>
        <Label for='title'><strong>TITLE OF CHALLENGE</strong></Label>
        <Input type='text' id='title' value={challengeDetails.title} placeholder='TITLE OF CHALLENGE' onChange={e => setChallengeDetails(prv => ({...prv, title: e.target.value}))} required />
      </FormGroup>
      <FormGroup row tag="fieldset">
        <legend className="col-form-label col-sm-5"><strong>INVITE OTHERS TO CHALLENGE?</strong></legend>
        <Col sm={7}>
          <FormGroup check>
            <Input type='radio' name='inviteOthers' id='YES' value={challengeDetails.challengeAnnouncementID} onChange={() => {
              setChallengeDetails(prv => ({ ...prv, challengeAnnouncementID: _challengeID })); //for the challenge.
              setChallengeAnnouncement(prv => ({ ...prv, id: _challengeID, _challengeAnnouncementID: _challengeID })); //for the announcement.
            }} required />{' '}<Label for='YES' check><strong>YES</strong></Label>
          </FormGroup>
          <FormGroup check>
            <Input type='radio' name='inviteOthers' id='NO' value={challengeDetails.challengeAnnouncementID} onChange={() => {
              setChallengeDetails(prv => ({ ...prv, challengeAnnouncementID: '' }));
              setChallengeAnnouncement(prv => ({ ...prv, id: '', _challengeAnnouncementID: '' }));
            }} />{' '}<Label for='NO' check><strong>NO</strong></Label>
          </FormGroup>
        </Col>
      </FormGroup>
      {
        challengeDetails.challengeAnnouncementID && <Deadline challengeDetails={challengeDetails} setChallengeDetails={setChallengeDetails} />
      }
      <FormGroup>
        <Label for='description'><strong>DESCRIPTION</strong></Label>
        <Input type='textarea' id='description' placeholder='Briefly describe your challenge here.' value={challengeDetails.description} maxLength={107} onChange={e => setChallengeDetails(prv => ({...prv, description: e.target.value}))}/>
      </FormGroup>
      <FormGroup tag="fieldset">
        <legend>HOW DO YOU WANT YOUR CHALLENGE TO END?</legend>
        <FormGroup check>
          <Label for='date' check><strong>DATE</strong></Label>{' '}<Input type='radio' id='date' name='end-conditions' value={challengeDetails.howChallengeEnds} onChange={() => setChallengeDetails(prv => ({...prv, howChallengeEnds: 'date'}))}/>
        </FormGroup>
        <FormGroup check>
          <Label for='votes' check><strong>VOTES</strong></Label>{' '}<Input type='radio' name='end-conditions' value={challengeDetails.howChallengeEnds} onChange={() => setChallengeDetails(prv => ({...prv, howChallengeEnds: 'votes'}))}/>
        </FormGroup>
      </FormGroup>
      {
        challengeDetails.howChallengeEnds == 'date' && <ExpirationDateOption />
      }
      {
        challengeDetails.howChallengeEnds == 'votes' && <WinningVotesOption />
      }
      <FormGroup className='w-100'>
        <Button type='button' className='w-100' color='danger' size='lg' onClick={onButtonClick}>NEXT</Button>
      </FormGroup>
    </>
  )
}

export default ChallengeForm