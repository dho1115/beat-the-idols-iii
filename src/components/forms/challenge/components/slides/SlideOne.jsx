import React, { useContext } from 'react';

//Dependencies.
import { FormGroup, Label, Input } from 'reactstrap';
import { dataContext } from '../../../../../App';

import "./Slide.styles.css";

const SlideOne = () => {
   
   return (
      <div className='slide-div'>
         <FormGroup>
            <Label for='title'>TITLE OF CHALLENGE</Label>
            <Input type='text' id='title' placeholder='title' required />
         </FormGroup>
         <FormGroup>
            <Label for='description'>DESCRIPTION</Label>
            <Input type='textarea' id='description' placeholder='Brief description of challenge' maxLength={109} />
         </FormGroup>
      </div>
   )
}

export default SlideOne