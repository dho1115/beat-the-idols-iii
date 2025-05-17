import SecondSectionCarousel from "./SecondSectionCarousel"

import "./WelcomeComponent.styles.css"

const SecondSection = () => {
   const images = [
      { src: "https://images.pexels.com/photos/2531728/pexels-photo-2531728.jpeg?auto=compress&cs=tinysrgb&w=600", altText: 'first image', caption: 'image 1', key: 1 },
      { src: "https://images.pexels.com/photos/8198134/pexels-photo-8198134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", altText: 'second image', caption: 'image 2', key: 2 },
      { src: "https://images.pexels.com/photos/30989671/pexels-photo-30989671/free-photo-of-elegant-woman-in-blue-dress-on-theater-stage.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", altText: 'third image', caption: 'image 3', key: 3 }
   ]

   return (
      <div className='second-section my-1'>
         <header>
            <h1>You are the captain!!!</h1>
            <h3>Build your own performance team</h3>
         </header>
         <div>
            
         </div>
      </div>
   )
}

export default SecondSection