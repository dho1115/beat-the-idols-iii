import React from 'react'
import { Button, Container, Form, FormGroup, Input } from 'reactstrap'

import "./ContactPage.styles.css";

const ContactPage = () => {
  return (
    <div className='contact-page-div'>
      <header>FEEL FREE TO CONTACT US!!!</header>
      <Container>
         <Form onSubmit={(e) => {
            e.preventDefault()
            console.log("Thanks for the submission!!!")
         }}>
            <FormGroup>
               <Input type='text' placeholder='Your name' />
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