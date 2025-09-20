import React, { useContext } from 'react'
import { FormGroup, Input, Label } from 'reactstrap';
import { dataContext } from '../../../App';
import { OnlineOption, UploadOption } from './PersonalImagesInput';


const PersonalImagesSource = () => {
  const { currentUser, setCurrentUser } = useContext(dataContext);
  const { imageSource } = currentUser;

  return (
    <>
      <FormGroup tag="fieldset">
        <legend>
          <strong>SOURCE OF YOUR PERSONAL IMAGE.</strong>
        </legend>
        <FormGroup check>
          <Input type='radio' name='imageSource' value={imageSource} onChange={e => setCurrentUser(prv => ({...prv, imageSource: 'online'}))} required /> {' '} <Label check>ONLINE</Label>
        </FormGroup>
        <FormGroup check>
          <Input type='radio' name='imageSource' value={imageSource} onChange={e => setCurrentUser(prv => ({...prv, addImage: 'upload'}))} /> {' '} <Label check>UPLOAD</Label>
        </FormGroup>
      </FormGroup>
    </>
  )
}

export default PersonalImagesSource