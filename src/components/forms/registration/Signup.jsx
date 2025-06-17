import React, { useContext, useEffect } from 'react';

//Dependencies.
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { dataContext } from '../../../App';
import { v4 } from 'uuid';
import { usePost } from '../../../functions/postapi';

import "./registrationforms.css"

const Signup = ({ text, registrationModal, toggle }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, allUsers, setAllUsers } = useContext(dataContext);

  const handleSignup = e => {
    e.preventDefault();
    const _userID = v4();
    usePost(
      'http://localhost:3003/currentUser',
      { ...currentUser, id: _userID },
      data => setCurrentUser(prv => ({ ...prv, ...data }))
    )
      .then(result => {
        console.log({ message: 'SUCCESS MESSAGE from http://localhost:3003/currentUser', result, currentUser });
      })
      .catch(error => console.error({ message: 'ERROR MESSAGE from http://localhost:3003/currentUser', error, errorCode: error.code, errorMessage: error.message, currentUser }));
    
    usePost(
      'http://localhost:3003/allUsers',
      { ...currentUser, id: _userID },
      data => setAllUsers(prv => ([...prv, data]))
    )
      .then(result => {
        console.log({ message: 'SUCCESS MESSAGE from http://localhost:3003/allUsers', result, allUsers });
      })
      .catch(error => console.error({ message: 'ERROR MESSAGE from http://localhost:3003/allUsers', error, errorCode: error.code, errorMessage: error.message, allUsers }));
  }

  useEffect(() => {
    (currentUser.id && currentUser.username) && navigate(`/currentUser/${currentUser.id}/`);
    return () => {
      console.log(`ON EXIT: currentUser is ${JSON.stringify(currentUser)}.`);
    };
  }, [currentUser.id, currentUser.username])

  
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