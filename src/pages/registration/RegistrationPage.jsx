import React, {Suspense} from 'react'

//Components.
import Registration from '../../components/registration/Registration';
import SuspenseFallback from '../../components/suspense_fallback/SuspenseFallback';

import "./RegistrationPage.styles.css";

const RegistrationPage = () => {
  return (
   <div className='registration-page-div py-5'>
      <Suspense fallback={<SuspenseFallback />}>
         <h1>LOGIN AND SIGNUP GOES HERE.</h1>
      </Suspense>
   </div>
  )
}

export default RegistrationPage