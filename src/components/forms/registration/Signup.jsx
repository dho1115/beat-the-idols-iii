import React, { useContext, useEffect } from 'react';

//Dependencies.
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { v4 } from 'uuid';
import { dataContext } from '../../../App';

import "./registrationforms.css"

const Signup = ({ text, registrationModal, toggle }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(dataContext);

  const handleSignup = e => {
    e.preventDefault();
    const _userID = v4();
    console.log(`Submitted information for ${_userID}.`);
    setCurrentUser(prv => ({ ...prv, _userID }));
  }

  useEffect(() => {
    if (currentUser._userID) navigate(`/currentUser/${currentUser._userID}/`)
  
    return () => {
      
    }
  }, [currentUser._userID]) //Navigate to user's homepage only if there is a _userID.
  
  
  return (
    <Modal
      isOpen={registrationModal.signUp}
      toggle={toggle}
      backdrop="static"
    >
      <ModalHeader style={{ backgroundColor: 'khaki' }} toggle={toggle}>
        {text}     
      </ModalHeader>
      <ModalBody style={{backgroundColor: 'lightgrey'}}>
         <Form onSubmit={handleSignup} className='signupform'>
          <FormGroup>
            <Label for='username'>USERNAME</Label>
            <Input type='text' id='username' placeholder='username' required onChange={e => setCurrentUser(prv => ({...prv, username: e.target.value}))} />
          </FormGroup>
          <FormGroup>
            <Label for='password'>PASSWORD</Label>
            <Input type='password' id='password' placeholder='password' required onChange={e => setCurrentUser(prv => ({...prv, password: e.target.value}))} />
          </FormGroup>
          <FormGroup>
            <Label for='email'>E-MAIL</Label>
            <Input type='email' id='email' placeholder='email' required onChange={e => setCurrentUser(prv => ({...prv, email: e.target.value}))} />
          </FormGroup>
          <FormGroup>
            <button type="submit" className="btn btn-danger btn-lg btn-block" style={{width: '100%'}}>SUBMIT</button>
          </FormGroup>
         </Form>
      </ModalBody>
    </Modal>
  )
}

export default Signup