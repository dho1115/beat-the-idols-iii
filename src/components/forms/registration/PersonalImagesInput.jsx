import React, { useContext } from 'react'
import { FormGroup, Label, Input } from 'reactstrap';
import { dataContext } from '../../../App';

export const OnlineOption = () => {
  const { currentUser, setCurrentUser, personalImages } = useContext(dataContext);

  return (
    <FormGroup>
      <Label for='online'>Copy/Paste the Online Link</Label>
      <Input type='text' id='online' value={personalImages} placeholder='paste online address here' onChange={e => setCurrentUser(prv => ({...prv, personalImages: [...currentUser.personalImages, e.target.value]}))} />
    </FormGroup>
  )
}

export const UploadOption = () => {
  const { setCurrentUser, personalImages } = useContext(dataContext);

  const FileToLink = file => {
    //logic to convert file to link
    console.log(`Please use Firebase Storage (or other third party) to convert ${file} to a link.`)
  }

  return (
    <FormGroup>
      <Label for='upload'>Upload Your Image File.</Label>
      <Input type='file' id='online' value={personalImages} placeholder='paste online address here' onChange={e => setCurrentUser(prv => ({...prv, personalImages: [...prv.personalImages, FileToLink(e.target.files[0])]}))} />
    </FormGroup>
  )
}
