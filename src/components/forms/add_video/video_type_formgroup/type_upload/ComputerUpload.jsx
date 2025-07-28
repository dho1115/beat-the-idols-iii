import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap';

import './ComputerUpload.css';

const ComputerUpload = ({currentState, setStateFunction}) => {
  return (
    <FormGroup>
      <Label for='upload'>UPLOAD FROM COMPUTER</Label>
      <Input type='file' value={currentState} id='upload' name='upload' placeholder='upload from computer' accept='.mp4, .MP4, .AVI' pattern='(?i)\.(mp4|avi)$' required onChange={e => setStateFunction(prv => ({...prv, urlOrFile: e.target.value}))} />
    </FormGroup>
  )
}

export default ComputerUpload