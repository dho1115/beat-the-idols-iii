import React, {Suspense} from 'react'

//Components.
import Registration from '../../components/registration/Registration';
import SuspenseFallback from '../../components/suspense_fallback/SuspenseFallback';

//media.
import singers from "../../media/videos/singingGroup.mp4";
import musicians from "../../media/videos/musicians.mp4"

import "./RegistrationPage.styles.css";

const RegistrationPage = () => {
  return (
   <div className='registration-page-div py-5'>
      <Suspense fallback={<SuspenseFallback />}>
         <div className='registration-buttons-div'>
            <Registration title="REGISTER" link={singers} mediaFormat="uploadedVideo" />
            <Registration title="LOGIN" link={musicians} mediaFormat="uploadedVideo" />
         </div>
      </Suspense>
   </div>
  )
}

export default RegistrationPage