import React, { createContext, useContext, useEffect, useState } from 'react';

//Dependencies and Components.
import { Container, Form } from 'reactstrap';
import { Carousel } from 'react-bootstrap';
import { dataContext } from '../../../App';
import ItemDiv from './components/ItemDiv';
import SlideOne from './components/slides/SlideOne';
import SlideTwo from './components/slides/SlideTwo';
import SlideThree from './components/slides/SlideThree';

export const ChallengeFormContext = createContext();

import './ChallengeForm.styles.css';

const ChallengeForm = () => {
  const { challengeAnnouncements, setChallengeAnnouncements, currentChallenges, setCurrentChallenges, currentUser } = useContext(dataContext);
  const [challengeFormDetails, setChallengeFormDetails] = useState({});
  const [index, setIndex] = useState(0);
  const handleSelect = selectedIndex => setIndex(selectedIndex);
  const { Item } = Carousel;

  const slides = [<SlideOne />, <SlideTwo />, <SlideThree />]
  
  useEffect(() => {
    console.log({ challengeFormDetails });
    return () => setChallengeFormDetails({});
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    console.log("======= SUBMITTED THE FOLLOWING: =======");
    console.log(challengeFormDetails);
    console.log("========================================");
  }

  return (
    <Container className='challenge-form-container p-0'>
      <ChallengeFormContext.Provider value = {{handleSubmit, challengeFormDetails, setChallengeFormDetails}}>
        <Form onSubmit={handleSubmit}>
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
      </ChallengeFormContext.Provider>            
    </Container>        
  )
}

export default ChallengeForm
