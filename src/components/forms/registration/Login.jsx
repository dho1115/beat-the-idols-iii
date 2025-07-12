import React, {useEffect, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';

//Dependencies.
import { Form, Modal, ModalHeader, ModalBody, FormGroup, Input, Label, Alert } from 'reactstrap'
import { dataContext } from '../../../App'
import { PostDataAPI } from '../../../functions/postapi';

import "./registrationforms.css"

const Login = ({ text, registrationModal, toggle }) => {
  const { currentUser, setCurrentUser, allUsers, welcomeLinks, setWelcomeLinks } = useContext(dataContext);
  const [currentUserNotFound, setCurrentUserNotFound] = useState(false);
  const [dataEntered, setDataEntered] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const onHandleSubmit = e => {
    e.preventDefault();
    const loggedInUserExists = allUsers.find((val) => ((val.username == dataEntered.username) && (val.password == dataEntered.password))) //Check to see if what the user entered matches the list of users (allUsers).
    
    try {
      if (!loggedInUserExists) throw new Error(`There is no such user in allUsers that matches ${JSON.stringify(dataEntered)}. loggedInUserExists returned ${JSON.stringify(loggedInUserExists)}.`) //If logged in user does NOT exist.

      PostDataAPI("http://localhost:3003/currentUser", loggedInUserExists)
      .then(result => {
        setCurrentUserNotFound(false);
        setCurrentUser(prv => ({ ...prv, ...loggedInUserExists })); //setCurrentUser
        return currentUser;
      })
      .then(() => navigate(`/currentUser/${currentUser.id}`))
      .catch(error => console.error({ from: "Login.jsx", message: "Error inside onHandleSubmit!!!", error, errorMessage: error.message }));
    }

    catch (error) {
      console.error({ message: "error in onHandleSubmit function in Login.jsx!!!", error, errorMessage: error.message })
      setCurrentUserNotFound(true);
    }
  }

  useEffect(() => {
    if (currentUser.id && currentUser.username) {
      navigate(`/currentUser/${currentUser.id}`);
      toggle();
    }

    return () => {
      setCurrentUserNotFound(false);
      setDataEntered({ username: "", password: "" });
    };
  }, [currentUser.id && currentUser.username])

  useEffect(() => {
    if (!registrationModal.login || !registrationModal.signUp) {
      setCurrentUserNotFound(false);
      setDataEntered({ username: "", password: "" });
    }
  }, [registrationModal.login, registrationModal.signUp]);

  return (
    <Modal
      isOpen={registrationModal.login}
      toggle={toggle}
      backdrop='static'
    >
      <ModalHeader style={{ backgroundColor: 'khaki' }} toggle={toggle}>
        {text}
        {currentUserNotFound && <Alert color='danger'>There is no user that matches your entry of {JSON.stringify(dataEntered)}!!!</Alert>}
      </ModalHeader>
      <ModalBody style={{ backgroundColor: 'lightgrey' }}>
        <Form onSubmit={onHandleSubmit}>
          <FormGroup>
            <Label for='username'>USERNAME</Label>
            <Input type='text' placeholder='username' value={dataEntered.username} id='username' required onChange={e => setDataEntered(prv => ({ ...prv, username: e.target.value }))} />
          </FormGroup>
          <FormGroup>
            <Label for='password'>PASSWORD</Label>
            <Input type='password' placeholder='password' value={dataEntered.password} id='password' required onChange={e => setDataEntered(prv => ({ ...prv, password: e.target.value }))} />
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