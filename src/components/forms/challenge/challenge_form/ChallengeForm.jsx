import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { ChallengeDetailsContext } from '../ChallengeFormComponent';
import { dataContext } from '../../../../App';

//Modules-Components.
import ChallengeAnnouncementForm from '../../challenge-announcement/challenge_announcement_form/ChallengeAnnouncementForm';
import ChallengeEndsChoices from '../challenge_ends_option/ChallengeEndsChoices';

import './ChallengeForm.styles.css';

const ChallengeForm = () => {
  const navigate = useNavigate();
  const { challengeDetails, setChallengeDetails, challengeAnnouncement, setChallengeAnnouncement, dateAlert, setDateAlert } = useContext(ChallengeDetailsContext);
  const { currentUser } = useContext(dataContext);

  const onButtonClick = () => {
    setDateAlert(false);
    if ((challengeAnnouncement._challengeAnnouncementID) && (challengeAnnouncement.announcementEndsOn > challengeDetails.challengeExpires)) {
      setDateAlert(true)
      return;
    } //validation to ensure the announcement end date < challenge expiration.

    if (challengeDetails.challengeExpires == '0000-00-00') {
      setDateAlert(true);
      return;
    }
    navigate(`/currentUser/${currentUser.id}/challenge-form/add-video`, { state: { from: "ChallengeForm.jsx" } });
  }

  return (
    <>
      <FormGroup>
        <Label for='title'><strong>TITLE OF CHALLENGE</strong></Label>
        <Input type='text' id='title' value={challengeDetails.title} placeholder='TITLE OF CHALLENGE' onChange={e => setChallengeDetails(prv => ({...prv, title: e.target.value}))} required />
      </FormGroup>
      <FormGroup>
        <Label for='description'><strong>DESCRIPTION</strong></Label>
        <Input type='textarea' id='description' placeholder='Briefly describe your challenge here.' value={challengeDetails.description} maxLength={107} onChange={e => setChallengeDetails(prv => ({...prv, description: e.target.value}))}/>
      </FormGroup>
      <FormGroup row tag="fieldset">
        <legend className="col-form-label col-sm-5"><strong>INVITE OTHERS TO CHALLENGE?</strong></legend>
        <Col sm={7}>
          <FormGroup check>
            <Input type='radio' name='inviteOthers' id='YES' value={challengeDetails.challengeAnnouncementID} onChange={() => {
              setChallengeDetails(prv => ({ ...prv, challengeAnnouncementID: challengeDetails._challengeID })); //for the challenge.

              setChallengeAnnouncement(prv => ({ ...prv, id: challengeDetails._challengeID, _challengeAnnouncementID: challengeDetails._challengeID })); //for the announcement.
            }} required />{' '}<Label for='YES' check><strong>YES</strong></Label>
          </FormGroup>
          <FormGroup check>
            <Input type='radio' name='inviteOthers' id='NO' value={challengeDetails.challengeAnnouncementID} onChange={() => {
              setChallengeDetails(prv => ({ ...prv, challengeAnnouncementID: '' }));
              
              setChallengeAnnouncement(prv => ({...prv, id: '', _announcementOwnerID: '', headline: '', description: '', announcementEndsOn: '0000-00-00', _challengeAnnouncementID: '' }));
            }} />{' '}<Label for='NO' check><strong>NO</strong></Label>
          </FormGroup>
        </Col>
      </FormGroup>
      {
        challengeAnnouncement._challengeAnnouncementID ? <ChallengeAnnouncementForm /> : <ChallengeEndsChoices />
      }
      <FormGroup className='w-100'>
        <Button type='button' className='w-100' color='danger' size='lg' onClick={onButtonClick} disabled={dateAlert}>{dateAlert ? <strong>FIX ERRORS BEFORE CONTINUING!!!</strong> : <strong>NEXT</strong>}</Button>
      </FormGroup>
    </>
  )
}

export default ChallengeForm