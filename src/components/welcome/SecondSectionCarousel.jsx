import { Carousel } from 'react-bootstrap';
import ErrorBoundary from '../ErrorBoundary';

import './WelcomeComponent.styles.css';

const SecondSectionCarousel = ({ images }) => {
  console.log(images);
  debugger;

  const { Item, Caption } = Carousel;

  return (
   <div className='second-section-carousel-div px-1'>
      <ErrorBoundary fallback={<h3>Error inside SecondSectionCarousel.jsx. Location = {location.pathname}.</h3>}>
        <Carousel className='react-bootstrap-carousel'>
          {
            images.map(({src, caption, altText, key}, idx) => (
              <Item key={idx}>
                <div className='img-div'>
                  <img src={src} altText={altText}/>
                </div>                
              </Item>
            ))
          }          
        </Carousel>
      </ErrorBoundary>
   </div>
  )
}

export default SecondSectionCarousel