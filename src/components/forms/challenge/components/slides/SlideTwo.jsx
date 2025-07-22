import React from 'react'
import { Col, FormGroup, Input, Label } from 'reactstrap';

import "./Slide.styles.css";

const SlideTwo = () => {
  return (
    <div className='slide-div'>
      <FormGroup row tag='fieldset'>
         <legend className='col-form-label col-sm-3'>
            <strong>Is this an <span className='text-danger'>OPEN CHALLENGE</span>?</strong>
         </legend>
         <Col sm={9}>
            <FormGroup check>
               <Input name='isOpen' value={true} type='radio' required /> {' '} <Label check>YES.</Label>
            </FormGroup>
            <FormGroup check>
               <Input name='isOpen' value={false} type='radio' /> {' '} <Label check>NO.</Label>
            </FormGroup>
         </Col>
      </FormGroup>
    </div>
  )
}

export default SlideTwo