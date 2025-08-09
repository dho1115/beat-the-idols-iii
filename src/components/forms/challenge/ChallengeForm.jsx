import React, { useState } from 'react';
import { Col, Form, FormGroup, Input, Label } from 'reactstrap';
import Deadline from './input_invite_others/Deadline';

import './ChallengeForm.styles.css';

const ChallengeForm = () => {
  const [challengeDetails, setChallengeDetails] = useState({ id: null, posted: null, title: '', inviteOthers: '', deadline: "0000-00-00", challengeExpires: ''});
  
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for='title'>TITLE OF CHALLENGE</Label>
        <Input type='text' id='title' value={challengeDetails.title} placeholder='TITLE OF CHALLENGE' onChange={e => setChallengeDetails(prv => ({...prv, title: e.target.value}))} required />
      </FormGroup>
      <FormGroup row tag="fieldset">
        <legend className="col-form-label col-sm-5">INVITE OTHERS TO CHALLENGE?</legend>
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
        <Label for='description'>DESCRIPTION</Label>
        <Input type='textarea' id='description' placeholder='DESCRIPTION' maxLength={107} />
      </FormGroup>
    </Form>
  )
}

export default ChallengeForm