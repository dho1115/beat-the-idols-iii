import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
const YouTubeUpload = ({currentState, setStateFunction}) => {
  return (
    <FormGroup>
      <Label for='you-tube'>ADD YOU-TUBE URL.</Label>
      <Input type='text' value={currentState} placeholder='You-Tube url' onChange={setStateFunction} required/>
    </FormGroup>
  )
}

export default YouTubeUpload