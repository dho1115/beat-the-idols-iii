import { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

import './WelcomeComponent.styles.css';

const SecondSectionCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

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
        <img src={val.src} alt={val.altText} />
      <CarouselCaption
        captionText={val.caption}
        captionHeader={val.caption}
      />
    </CarouselItem>
  ))

  return (
   <div>
      <h1>Carousel would go here</h1>      
   </div>
  )
}

export default SecondSectionCarousel