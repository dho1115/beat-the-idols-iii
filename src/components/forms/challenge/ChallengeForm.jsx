import React, { useState } from 'react'
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem, Form, FormGroup, Input, Label } from 'reactstrap'

//Components-Slides
import SlideOne from './components/SlideOne'

import "./ChallengeForm.styles.css";

const ChallengeForm = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const frames = [SlideOne, SlideOne, SlideOne];

  const ComponentSlides = frames.map((Slide, idx) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={idx}
      >
        <Slide />
      </CarouselItem>
    )
  })

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex == ComponentSlides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex == 0 ? ComponentSlides.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (index) => {
    if (animating) return;
    setActiveIndex(index);
  }

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      console.log("Submitted the form!!!")
    }} className='challenge-form p-3 m-1'>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        style={{ backgroundColor: 'whitesmoke' }}
        className='p-1'
      >
        <CarouselIndicators 
          items={frames}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {ComponentSlides}
        <CarouselControl 
          direction='prev'
          directionText='PREVIOUS'
          onClickHandler={previous}
          style={{color: 'maroon'}}
        />
        <CarouselControl 
          direction='next'
          directionText='NEXT'
          onClickHandler={next}
        />
      </Carousel>
    </Form>
  )
}

export default ChallengeForm