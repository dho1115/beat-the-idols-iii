import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { DateTime } from 'luxon';
import Deadline from './input_invite_others/Deadline';
import { dataContext } from '../../../../App';
import { ChallengeDetailsContext } from '../ChallengeFormComponent';

import './ChallengeForm.styles.css';

const ChallengeForm = () => {
  const navigate = useNavigate();
  const { challengeDetails, setChallengeDetails } = useContext(ChallengeDetailsContext);
  const { currentUser } = useContext(dataContext);

  const challengeExpiration = () => {
    if (challengeDetails.inviteOthers) {
      const deadlineString = challengeDetails.deadline;
      const ISOmin = DateTime.fromISO(deadlineString)
      const min = ISOmin.plus({ days: 3 }).toFormat('yyyy-MM-dd');
      const max = ISOmin.plus({ months: 5 }).toFormat('yyyy-MM-dd');
      return { min, max };
    }

    const min = DateTime.local().plus({ days: 3 }).toFormat("yyyy-MM-dd");
    const max = DateTime.local().plus({ months: 5 }).toFormat("yyyy-MM-dd");

    return { min, max };
  }

  const onButtonClick = () => navigate(`/currentUser/${currentUser.id}/challenge-form/add-video`)

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
            <Input type='radio' name='inviteOthers' id='YES' value={challengeDetails.inviteOthers} onChange={() => setChallengeDetails(prv => ({...prv, inviteOthers: true}))} required />{' '}<Label for='YES' check>YES</Label>
          </FormGroup>
          <FormGroup check>
            <Input type='radio' name='inviteOthers' id='NO' value={challengeDetails.inviteOthers} onChange={() => setChallengeDetails(prv => ({...prv, inviteOthers: false}))} />{' '}<Label for='NO' check>NO</Label>
          </FormGroup>
        </Col>
      </FormGroup>
      {
        challengeDetails.inviteOthers && <Deadline challengeDetails={challengeDetails} setChallengeDetails={setChallengeDetails} />
      }
      <FormGroup>
        <Label for='description'><strong>DESCRIPTION</strong></Label>
        <Input type='textarea' id='description' placeholder='Briefly describe your challenge here.' value={challengeDetails.description} maxLength={107} onChange={e => setChallengeDetails(prv => ({...prv, description: e.target.value}))}/>
      </FormGroup>
      <FormGroup>
        <Label for='challengeEnds'><strong>CHALLENGE END DATE</strong></Label>
        <Input type='date' id='challengeEnds' min={challengeExpiration().min} max={challengeExpiration().max} placeholder='Select a date for when your challenge ends' />
      </FormGroup>
      <FormGroup className='w-100'>
        <Button type='button' className='w-100' color='danger' size='lg' onClick={onButtonClick}>NEXT</Button>
      </FormGroup>
    </>
  )
}

export default ChallengeForm