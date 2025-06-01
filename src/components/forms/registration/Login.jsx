import React from 'react'

import { Form, Modal, ModalHeader, ModalBody, FormGroup, Input, Label } from 'reactstrap'

import "./registrationforms.css"

const Login = ({text, registrationModal, toggle}) => {
  return (
    <Modal
      isOpen={registrationModal.login}
      toggle={toggle}
      backdrop='static'
    >
      <ModalHeader style={{ backgroundColor: 'khaki' }} toggle={toggle}>
        {text}
      </ModalHeader>
      <ModalBody style={{backgroundColor: 'lightgrey'}}>
        <Form onSubmit={e => console.log("submitted form")}>
          <FormGroup>
            <Label for='username'>USERNAME</Label>
            <Input type='text' placeholder='username' id='username' required />
          </FormGroup>
          <FormGroup>
            <Label for='password'>PASSWORD</Label>
            <Input type='password' placeholder='password' id='password' required />
          </FormGroup>
          <FormGroup>
            <button type="submit" class="btn btn-danger btn-lg btn-block">LOGIN</button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default Login