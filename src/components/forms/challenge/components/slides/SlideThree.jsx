import React, { useContext } from 'react'
import { Button, FormGroup } from 'reactstrap';

import { ChallengeFormContext } from '../../ChallengeForm';

import "./Slide.styles.css";


const SlideThree = () => {
   const { handleSubmit } = useContext(ChallengeFormContext);

   return (
      <div className='slide-div'>
         <FormGroup className='w-100'>
            <Button
               type='submit'
               color='danger'
               className='btn w-100'
            >
               FINISHED!!!
            </Button> 
         </FormGroup>
      </div>
   )
}

export default SlideThree