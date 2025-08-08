import React, { Suspense, useContext } from 'react'
import { Container } from 'reactstrap';
import { dataContext } from '../../../../../App'
import SuspenseFallback from '../../../../suspense_fallback/SuspenseFallback';
import ErrorBoundary from '../../../../ErrorBoundary';

import "./Slide.styles.css";

const AddVideosSlide = () => {
   const { videos } = useContext(dataContext);

   return (
      <div className='slide-div'>
         <Container className='m-0' style={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke' }}>
            <ErrorBoundary fallback={<h3 className='text-danger'>Problem inside AddVideosSlide.jsx</h3>}>
               <Suspense fallback={<SuspenseFallback />}>
                  <h1>THE VIDEOS GO HERE ALONG WITH A <button className='btn btn-danger'>SELECT THIS VIDEO!!!</button>.</h1>
               </Suspense>
            </ErrorBoundary>
         </Container>
      </div>
   )
}

export default AddVideosSlide