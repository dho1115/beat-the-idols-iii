import React, { createContext, useContext } from 'react';

import { Col, FormGroup, Input, Label } from 'reactstrap';
import { ChallengeFormContext } from '../../ChallengeForm';

import "./Slide.styles.css";


const SlideTwo = () => {
   const { challengeFormDetails, setChallengeFormDetails } = useContext(ChallengeFormContext);

   return (
      <div className='slide-div'>
         <FormGroup row tag='fieldset' style={{width: '100%'}}>
            <legend className='col-form-label col-sm-5 p-0'>
               <h3 className='p-0 m-0'>Is this an <span className='text-danger'>OPEN CHALLENGE</span>?</h3>
            </legend>
            <Col sm={7} style={{position: 'relative', left: '10%'}}>
               <FormGroup size='lg' className='my-1'>
                  <Input name='isOpen' value={true} type='radio' style={{scale: 1.75}} required onChange={e => setChallengeFormDetails({...challengeFormDetails, isOpenChallenge: e.target.value})} /> {' '} <Label check className='mx-3'><strong>YES.</strong></Label>
               </FormGroup>
               <FormGroup check>
                  <Input name='isOpen' value={false} type='radio' style={{scale: 1.75}} onChange={e => setChallengeFormDetails({...challengeFormDetails, isOpenChallenge: e.target.value})} /> {' '} <Label check className='mx-3'><strong>NO.</strong></Label>
               </FormGroup>
            </Col>
         </FormGroup>
      </div>
   )
}

export default SlideTwo