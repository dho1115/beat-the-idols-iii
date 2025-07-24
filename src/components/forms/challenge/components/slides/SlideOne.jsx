import React, { useContext } from 'react';

//Dependencies.
import { FormGroup, Label, Input } from 'reactstrap';
import { ChallengeFormContext } from '../../ChallengeForm';

import "./Slide.styles.css";

const SlideOne = () => {
   const { challengeFormDetails, setChallengeFormDetails } = useContext(ChallengeFormContext);

   return (
      <div className='slide-div'>
         <div style={{width: '100%'}}>
            <FormGroup>
               <Label for='title'>TITLE OF CHALLENGE</Label>
               <Input type='text' id='title' placeholder='title' required onChange={e => setChallengeFormDetails({...challengeFormDetails, title: e.target.value})} />
            </FormGroup>
            <FormGroup>
               <Label for='description'>DESCRIPTION</Label>
               <Input type='textarea' id='description' placeholder='Brief description of challenge' maxLength={109} onChange={e => setChallengeFormDetails({...challengeFormDetails, description: e.target.value})} />
            </FormGroup>
         </div>
      </div>
   )
}

export default SlideOne