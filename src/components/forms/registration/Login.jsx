import React, {useEffect, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';

//Dependencies.
import { Form, Modal, ModalHeader, ModalBody, FormGroup, Input, Label, Alert } from 'reactstrap'
import { dataContext } from '../../../App'

import "./registrationforms.css"

const Login = ({ text, registrationModal, toggle }) => {
  const { currentUser, setCurrentUser, allUsers } = useContext(dataContext);
  const [currentUserNotFound, setCurrentUserNotFound] = useState(false);
  const [dataEntered, setDataEntered] = useState({ username: "", password: "" });
  console.log(dataEntered)
  const navigate = useNavigate()

  const onHandleSubmit = e => {
    e.preventDefault();
    const loggedInUserExists = allUsers.find((val) => ((val.username == dataEntered.username) && (val.password == dataEntered.password)));
    
    try {
      if (!loggedInUserExists || !(loggedInUserExists.username && loggedInUserExists.password)) throw new Error(`There is no such user with username and password of ${JSON.stringify(dataEntered)}!!!`);
      else {
        setCurrentUserNotFound(false);
        setCurrentUser(prv => ({ ...prv, ...loggedInUserExists }));
      }
    } catch (error) {
      console.error({ message: "error in onHandleSubmit function in Login.jsx!!!", error, errorMessage: error.message })
      setCurrentUserNotFound(true);
    }
  }

  useEffect(() => {
    if (currentUser.id && currentUser.username) navigate(`/currentUser/${currentUser.id}`);
    toggle();

    return () => {
      setCurrentUserNotFound(false);
      setDataEntered({ username: "", password: "" });
    };
  }, [currentUser.id && currentUser.username])

  useEffect(() => {
    return () => {
      setCurrentUserNotFound(false);
      setDataEntered({ username: "", password: "" });
    }
  }, []);

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
      <ModalBody style={{backgroundColor: 'lightgrey'}}>
        <Form onSubmit={onHandleSubmit}>
          <FormGroup>
            <Label for='username'>USERNAME</Label>
            <Input type='text' placeholder='username' value={dataEntered.username} id='username' required onChange={e => setDataEntered(prv => ({...prv, username: e.target.value }))}/>
          </FormGroup>
          <FormGroup>
            <Label for='password'>PASSWORD</Label>
            <Input type='password' placeholder='password' value={dataEntered.password} id='password' required onChange={e => setDataEntered(prv => ({...prv, password: e.target.value }))} />
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