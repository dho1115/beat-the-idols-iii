import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DateTime } from "luxon";

//Components and dependencies.
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { dataContext } from '../../../App';
import YouTubeUpload from './video_type_formgroup/type_youtube/YouTubeUpload';
import ComputerUpload from './video_type_formgroup/type_upload/ComputerUpload';
import { v4 } from 'uuid';
import { PostDataAPI } from '../../../functions/postapi';

import "./AddVideo.styles.css";


const AddVideo = () => {
  const { currentUser, setVideos } = useContext(dataContext);
  const navigate = useNavigate();
  const [video, setVideo] = useState({ _userID: currentUser.id, username: currentUser.username, title: '', description: '', videoType: '' });
  
  const onHandleAddVideo = e => {
    e.preventDefault();
    const _videoID = v4();
    const dateObject = DateTime.now().startOf("day")
    const datePosted = dateObject.toFormat("MM-dd-yyyy");
    PostDataAPI("http://localhost:3003/videos", { ...video, id: _videoID, posted: datePosted, record: { wins: 0, losses: 0, ties: 0, winPct: 0 } })
      .then(result => {
        console.log({ message: 'From onHandleAddVideo: PostDataAPI success!!!', result });
        setVideo(prv => ({ ...prv, id: _videoID, posted: datePosted }));
        return "About to set videos (context)"
      })
      .then(successMessage => {
        console.log({ successMessage: successMessage });
        setVideos(prv => ([...prv, { ...video }]))
      })
      .catch(error => ({ message: "PostDataAPI error!!!", error, errorCode: error.code, errorMessage: error.message }))
      .finally(() => {
        setVideo({ title: '', description: '', videoType: '', urlOrFile: ''});
        navigate(`/currentUser/${currentUser.id}/view/challengeVideos/all`)
      })
  }

  useEffect(() => {
    return () => setVideo({ _userID: currentUser.id, username: currentUser.username, title: '', description: '', videoType: '' })
  }, [])

  return (
    <Form onSubmit={onHandleAddVideo} className='add-video-form p-3 m-5'>
      <FormGroup>
        <Label for='title'>
          <h3>TITLE OF YOUR VIDEO</h3>
        </Label>
        <Input type='text' id='title' value={video.title} placeholder='title' onChange={e => setVideo(prv => ({...prv, title: e.target.value}))} required/>
      </FormGroup>
      <FormGroup>
        <Label for='description'>
          <h3>BRIEF DESCRIPTION.</h3>
        </Label>
        <Input type='textarea' id='description' value={video.description} placeholder='description' onChange={e => setVideo(prv => ({...prv, description: e.target.value}))} maxLength={109} required/>
      </FormGroup>
      <FormGroup tag='fieldset'>
        <legend><strong>Enter Type of Video (you-tube or upload).</strong></legend>
        <FormGroup check>
          <Input type='radio' name='videoType' id='upload' value='upload' onChange={e => setVideo({...video, videoType: e.target.value})} required /> {' '} <Label for='upload' check>UPLOAD.</Label>
        </FormGroup>
        <FormGroup check>
          <Input type='radio' name='videoType' id='you-tube' value='you-tube' onChange={e => setVideo({...video, videoType: e.target.value})} /> {' '} <Label for='you-tube' check>YOU-TUBE.</Label>
        </FormGroup>
      </FormGroup>
      {video.videoType == 'you-tube' && <YouTubeUpload currentState={video.urlOrFile} setStateFunction={setVideo}  />}
      {video.videoType == 'upload' && <ComputerUpload currentState={video.urlOrFile} setStateFunction={setVideo} />}
      <FormGroup className='p-1'>
        <Button type='submit' size='lg' color='danger' className='w-100'>SUBMIT MY VIDEO!!!</Button>
      </FormGroup>
    </Form>
  )
}

export default AddVideo