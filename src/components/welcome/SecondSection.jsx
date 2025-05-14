import SecondSectionCarousel from "./SecondSectionCarousel"

import "./WelcomeComponent.styles.css"

const SecondSection = () => {
   const images = [
      { src: "https://images.pexels.com/photos/2531728/pexels-photo-2531728.jpeg?auto=compress&cs=tinysrgb&w=600", alt: 'first image' },
      { src: "https://images.pexels.com/photos/8198134/pexels-photo-8198134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: 'second image' },
      { src: "https://images.pexels.com/photos/30989671/pexels-photo-30989671/free-photo-of-elegant-woman-in-blue-dress-on-theater-stage.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: 'third image' }
   ]

   return (
      <div className='second-section my-1'>
         <header>
            <h1>You are the captain!!!</h1>
            <h3>Build your own performance team</h3>
         </header>
         <div>
            <SecondSectionCarousel images={images} />
         </div>
      </div>
   )
}

export default SecondSection