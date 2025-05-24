//Dependencies.
import { useLocation } from "react-router-dom"
import SecondSectionCarousel from "./SecondSectionCarousel"
import ErrorBoundary from "../ErrorBoundary"

import "./WelcomeComponent.styles.css"
import { Carousel } from "reactstrap"
import { useState } from "react"

const SecondSection = () => {
   const location = useLocation();

   const images = [
      { src: "https://images.pexels.com/photos/2531728/pexels-photo-2531728.jpeg?auto=compress&cs=tinysrgb&w=600", altText: 'first image', caption: 'image 1', key: 1 },
      { src: "https://images.pexels.com/photos/8198134/pexels-photo-8198134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", altText: 'second image', caption: 'image 2', key: 2 },
      { src: "https://images.pexels.com/photos/30989671/pexels-photo-30989671/free-photo-of-elegant-woman-in-blue-dress-on-theater-stage.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", altText: 'third image', caption: 'image 3', key: 3 }
   ]

   return (
      <div className='second-section my-1'>
         <ErrorBoundary fallback={<h1>Crap. Something went wrong inside {location.pathname}.</h1>}>
            <header>
            <h1>You are the captain!!!</h1>
            <h3>Build your own performance team</h3>
            </header>            
            <ErrorBoundary fallback={<h3>Error implementing Reactstrap Carousel</h3>}>
               <SecondSectionCarousel images={images} />
            </ErrorBoundary>            
         </ErrorBoundary>         
      </div>
   )
}

export default SecondSection