import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { Carousel } from 'react-bootstrap';
import { images } from './testImages';

import './ChallengeForm.styles.css';

const ChallengeForm = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = selectedIndex => setIndex(selectedIndex);
  const { Item } = Carousel;

  return (
    <Container>
      <Carousel activeIndex={index} interval={null} onSelect={handleSelect}>
        {
          images.map(({ src, alt }, idx) => {
            return (
              <Item key={idx} style={{ border: '1.5px solid black', backgroundColor: 'yellow', overflow: 'hidden', height: '75vh'}}>
                <img src={src} alt={alt} height='100%' width='100%' style={{objectFit: 'cover'}} />
              </Item>
            )
          })
        }
      </Carousel>
    </Container>        
  )
}

export default ChallengeForm
