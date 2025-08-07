import React, { useContext } from 'react'
import { Container } from 'reactstrap';
import { dataContext } from '../../../../../App'

import "./Slide.styles.css";

const AddVideosSlide = () => {
   const { videos } = useContext(dataContext);

   return (
      <div className='slide-div'>
         <Container className='m-0' style={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke'}}>
            <h1>THE VIDEOS GO HERE ALONG WITH A <button className='btn btn-danger'>SELECT THIS VIDEO!!!</button>.</h1>
         </Container>
      </div>
   )
}

export default AddVideosSlide