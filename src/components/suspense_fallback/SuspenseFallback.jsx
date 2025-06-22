import React from 'react'

//Dependencies.
import { Container } from 'reactstrap';

import "./SuspenseFallback.styles.css";

const SuspenseFallback = () => {
  return (
    <div className='suspense-fallback-div'>
      <Container className='suspense-fallback-container'>
         <h1>PLEASE BE PATIENT AS WE LOAD THIS PAGE...</h1>
      </Container>
    </div>
  )
}

export default SuspenseFallback