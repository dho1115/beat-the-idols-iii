import { Container } from 'reactstrap';

import "./AboutUs.styles.css";

const AboutUs = () => {
  return (
    <div className='my-5'>
      <header>
        <h1>ABOUT US PAGE:</h1>
      </header>
      <Container style={{ backgroundColor: 'beige', border: '1.75px solid black' }}>
        <h3>About Beat The Idols III</h3>
        <section>
          <strong>LOREM IPSUM DOLOR... BLAH BLAH BLAH.</strong>
        </section>
      </Container>
    </div>
  )
}

export default AboutUs