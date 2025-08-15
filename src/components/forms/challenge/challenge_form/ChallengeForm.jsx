import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { DateTime } from 'luxon';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import Deadline from './input_invite_others/Deadline';
import { dataContext } from '../../../../App';
import { ChallengeDetailsContext } from '../ChallengeFormComponent';

import './ChallengeForm.styles.css';

const ChallengeForm = () => {
  const navigate = useNavigate();
  const { challengeDetails, setChallengeDetails } = useContext(ChallengeDetailsContext);
  const { currentUser } = useContext(dataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const posted = DateTime.local().toFormat('yyyy-MM-dd');
    const _videoID = v4();
    let submitChallengeDetails = { posted, id: _videoID, ...challengeDetails, _videoID };
    if (!challengeDetails.inviteOthers) delete submitChallengeDetails.deadline;
    console.log("Successfully submitted the following:", challengeDetails);
    navigate(`/currentUser/${currentUser.id}/challenge-form/add-video`)
  }

  return (
      <ChallengeDetailsContext.Provider value={{challengeDetails, setChallengeDetails}}>
        <Form className='challenge-form p-3 m-1' onSubmit={handleSubmit}>
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
            <Input type='textarea' id='description' placeholder='Briefly describe your challenge here.' maxLength={107} />
          </FormGroup>
          <FormGroup>
            <Label for='challengeEnds'><strong>CHALLENGE END DATE</strong></Label>
            <Input type='date' id='challengeEnds' placeholder='Select a date for when your challenge ends' />
          </FormGroup>
          <FormGroup className='w-100'>
            <Button type='submit' className='w-100' color='danger' size='lg'>NEXT</Button>
          </FormGroup>
        </Form>
      </ChallengeDetailsContext.Provider>
  )
}

export default ChallengeForm