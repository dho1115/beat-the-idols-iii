import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { Carousel } from 'react-bootstrap';

import "./Slide.styles.css";

const SlideOne = () => {
   const { Item } = Carousel;
   return (
      <div style={{ backgroundColor: 'antiquewhite', width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
         <div style={{width: '75%'}}>
            <FormGroup>
               <Label for='title'>TITLE OF CHALLENGE</Label>
               <Input type='text' id='title' placeholder='title' required />
            </FormGroup>
            <FormGroup>
               <Label for='description'>DESCRIPTION</Label>
               <Input type='textarea' id='description' placeholder='Brief description of challenge' maxLength={109} />
            </FormGroup>
         </div>
      </div>
   )
}

export default SlideOne