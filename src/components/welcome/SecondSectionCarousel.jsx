import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import ErrorBoundary from '../ErrorBoundary';

import './WelcomeComponent.styles.css';

const SecondSectionCarousel = ({ images }) => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  console.log(images)

  const next = () => { 
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => { 
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex)
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex)
  }

  const slides = images.map(val => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={val.src}>
        <img src={val.src} alt={val.altText} className='img-fluid'/>
      <CarouselCaption
        captionText={val.caption}
        captionHeader={val.caption}
      />
    </CarouselItem>
  ))

  return (
   <div>
      <ErrorBoundary fallback={<h3>Error inside SecondSectionCarousel.jsx. Location = {location.pathname}.</h3>}>
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
          <CarouselIndicators 
            items={images}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides}
          <CarouselControl 
            direction='prev'
            directionText='previous'
            onClickHandler={previous}
          />
          <CarouselControl 
            direction='next'
            directionText='next'
            onClickHandler={next}
          />
        </Carousel>
      </ErrorBoundary>
   </div>
  )
}

export default SecondSectionCarousel