import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

const SlideOne = () => {
  return (
   <>
      <FormGroup>
         <Label for='title'>TITLE OF CHALLENGE</Label>
         <Input type='text' id='title' placeholder='title' required />
      </FormGroup>
      <FormGroup>
         <Label for='description'>DESCRIPTION</Label>
         <Input type='textarea' id='description' placeholder='Brief description of challenge' maxLength={109} />
      </FormGroup>
   </>
  )
}

export default SlideOne