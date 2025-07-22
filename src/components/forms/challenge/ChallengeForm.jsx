import React, { useContext, useState } from 'react';

//Dependencies and Components.
import { Container, Form } from 'reactstrap';
import { Carousel } from 'react-bootstrap';
import { dataContext } from '../../../App';
import ItemDiv from './components/ItemDiv';
import SlideOne from './components/slides/SlideOne';
import SlideTwo from './components/slides/SlideTwo';

import './ChallengeForm.styles.css';

const ChallengeForm = () => {
  const { challengeAnnouncements, setChallengeAnnouncements, currentChallenges, setCurrentChallenges, currentUser } = useContext(dataContext);
  const [index, setIndex] = useState(0);
  const handleSelect = selectedIndex => setIndex(selectedIndex);
  const { Item } = Carousel;

  const slides = [<SlideOne />, <SlideTwo />]
  
  const handleSubmit = e => {
    e.preventDefault;
  }

  return (
    <Container className='challenge-form-container p-0'>
      <Form>
        <Carousel
          activeIndex={index}
          indicators={false}
          interval={null}
          onSelect={handleSelect}
          variant='dark'
        >
          {
            slides.map((val, idx) => {
              return (
                <Item className="carousel-item"  key={idx}>
                  <ItemDiv slide={val} />
                </Item>
              )
            })
          }
        </Carousel>
      </Form>      
    </Container>        
  )
}

export default ChallengeForm
