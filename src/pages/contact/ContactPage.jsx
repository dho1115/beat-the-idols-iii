import React from 'react'
import { Button, Container, Form, FormGroup, Input } from 'reactstrap'

import "./ContactPage.styles.css";

const ContactPage = () => {
  return (
    <div className='contact-page-div my-5'>
      <header>FEEL FREE TO CONTACT US!!!</header>
      <Container>
         <Form onSubmit={(e) => {
            e.preventDefault()
            console.log("Thanks for the submission!!!")
         }} style={{borderRadius: '5px', border: '1.5px solid black', backgroundColor: 'lightsalmon'}} className='p-3'>
            <FormGroup>
               <Input type='text' placeholder='Your name' />
            </FormGroup>
            <FormGroup>
               <Input type='textarea' placeholder='Whaddya wanna say to us?' maxLength={573} />
            </FormGroup>
            <FormGroup>
               <Button size='lg' color='danger' type='submit'>SUBMIT</Button>
            </FormGroup>
         </Form>
      </Container>
    </div>
  )
}

export default ContactPage