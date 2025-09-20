import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap';


export const OnlineOption = () => {
  return (
    <FormGroup>
      <Label for='online'>Copy/Paste the Online Link</Label>
    </FormGroup>
  )
}

export const UploadOption = () => {
  return (
    <FormGroup>
      <Label for='upload'>Upload Your Image File.</Label>
    </FormGroup>
  )
}
