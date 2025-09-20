import React, { useContext, useEffect } from 'react';

//Dependencies.
import { dataContext } from '../../../App';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PersonalImagesSource from './PersonalImagesSource';
import { PostDataAPI } from '../../../functions/postapi';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import "./registrationforms.css"

const Signup = ({ text, registrationModal, toggle }) => {
  const _userID = v4();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, allUsers, setAllUsers } = useContext(dataContext);

  const { username, password, email, addImage } = currentUser;

  //Promises
  const addIDToCurrentUser = () => new Promise(
    (res, rej) => {
    setCurrentUser(prv => ({ ...prv, id: _userID }));
    if (currentUser.id) res({ from: 'addIDToCurrentUser', result: 'SUCCESS!!!', currentUser })
    else rej({ from: 'addIDToCurrentUser', result: 'FAILED (or not yet).', currentUser });
    }
  );

  const addUserToAllUsers = () => new Promise(
    (res, rej) => {
    const oldLengthAllUsers = allUsers.length;
    setAllUsers(prv => ([...prv, currentUser]));
    if (allUsers.length > oldLengthAllUsers) res({ from: 'AddUserToAllUsers', result: 'SUCCESS!!!', allUsers });
    else rej({ from: 'addIDToCurrentUser', result: 'FAILED (or not yet)', allUsers, currentUser });
    }
  );

  const handleSignup = e => {
    e.preventDefault();

    addIDToCurrentUser()
      .then(data => {
        console.log({ data });
        return PostDataAPI('http://localhost:3003/currentUser', data.currentUser)
      }).then(addIDToCurrentUserResult => {
        console.log({ addIDToCurrentUserResult });
        return addUserToAllUsers()
      })
      .then(addUserToAllUsersResult => {
        console.log({ addUserToAllUsersResult });
        return PostDataAPI('http://localhost:3003/allUsers', { ...currentUser })
      })
      .catch(error => console.error({ from: "addIDToCurrentUser", message: "ERROR!!!", error, errorCode: error.code, errorMessage: error.message, status: error.status }));
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