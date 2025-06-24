import React, {useEffect, useContext, useState} from 'react'

//Dependencies.
import { Form, Modal, ModalHeader, ModalBody, FormGroup, Input, Label } from 'reactstrap'
import { dataContext } from '../../../App'
import { fetchDataAPI } from '../../../functions/fetchapi'

import "./registrationforms.css"

const Login = ({ text, registrationModal, toggle }) => {
  const { currentUser, setCurrentUser } = useContext(dataContext);
  const [currentUserNotFound, setCurrentUserNotFound] = useState(false);

  const onHandleSubmit = e => {
    e.preventDefault();
    try {
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    return () => setCurrentUserNotFound(false)
  }, [])

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
        <Form onSubmit={onHandleSubmit}>
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