import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//Dependencies.
import { dataContext } from '../../../App';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PersonalImagesSource from './PersonalImagesSource';
import { PostDataAPI } from '../../../functions/postapi';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

//functions
import { PostRequestToDB } from './functions';

import "./registrationforms.css"

const Signup = ({ text, registrationModal, toggle }) => {
  const _userID = v4();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, setCurrentUser, allUsers, setAllUsers } = useContext(dataContext);

  const { username, password, email, addImage } = currentUser;

  const handleSignup = async e => {
    e.preventDefault();
    const updatedCurrentUser = { ...currentUser, id: _userID };
    try {
      const addToCurrentUserDBandSetState = await PostRequestToDB(_userID, currentUser, "http://localhost:3003/currentUser", () => setCurrentUser(prv => ({...prv, ...updatedCurrentUser})));
      const addToAllUsersDBAndSetState = await PostRequestToDB(_userID, currentUser, "http://localhost:3003/allUsers", () => setAllUsers(prv => ([...prv, updatedCurrentUser])), location);

      console.log({ message: "Registration is successful!!!", addToCurrentUserDBandSetState, addToAllUsersDBAndSetState });
      
      return { addToCurrentUserDBandSetState, addToAllUsersDBAndSetState };
    } catch (error) {
      console.error({ message: 'error inside handleSignup function!!!', error, errorCode: error.code, errorMessage: error.message });
    }
    
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
            <Input type='text' id='username' value={username} placeholder='username' required onChange={e => setCurrentUser(prv => ({...prv, username: e.target.value}))} />
          </FormGroup>
          <FormGroup>
            <Label for='password'>PASSWORD</Label>
            <Input type='password' id='password' value={password} placeholder='password' required onChange={e => setCurrentUser(prv => ({...prv, password: e.target.value}))} />
          </FormGroup>
          <FormGroup>
            <Label for='email'>E-MAIL</Label>
            <Input type='email' id='email' value={email} placeholder='email' required onChange={e => setCurrentUser(prv => ({...prv, email: e.target.value}))} />
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>
              <strong>Would you like to add a personal image?</strong>
            </legend>
            <FormGroup check>
              <Input type='radio' name='addImage' value={addImage} onChange={e => setCurrentUser(prv => ({...prv, addImage: true}))} required /> {' '} <Label check>YES.</Label>
            </FormGroup>
            <FormGroup check>
              <Input type='radio' name='addImage' value={addImage} onChange={e => setCurrentUser(prv => ({...prv, addImage: false}))} /> {' '} <Label check>NO.</Label>
            </FormGroup>
          </FormGroup>
          { addImage && <PersonalImagesSource />}
          <FormGroup>
            <button type="submit" className="btn btn-danger btn-lg btn-block" style={{width: '100%'}}>SUBMIT</button>
          </FormGroup>
         </Form>
      </ModalBody>
    </Modal>
  )
}

export default Signup