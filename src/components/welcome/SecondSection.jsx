//Dependencies.
import { useLocation } from "react-router-dom"
import SecondSectionCarousel from "./SecondSectionCarousel"
import ErrorBoundary from "../ErrorBoundary"

//Images dependencies.
import { images } from "./CarouselItems"

import "./WelcomeComponent.styles.css"

import { Carousel } from "reactstrap"
import { useState } from "react"

const SecondSection = () => {
   const location = useLocation();

   return (
      <div className='second-section my-1'>
         <div className="second-section-carousel">
            <ErrorBoundary fallback={<h1>Crap. Something went wrong inside {location.pathname}.</h1>}>            
               <ErrorBoundary fallback={<h3>Error implementing Reactstrap Carousel</h3>}>
                  <SecondSectionCarousel images={images} />          
               </ErrorBoundary>            
            </ErrorBoundary>
         </div>         
      </div>
   )
}

export default SecondSection