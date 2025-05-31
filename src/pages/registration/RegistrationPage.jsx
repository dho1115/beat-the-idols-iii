import React, {Suspense, useState} from 'react'

//Dependencies.
import Registration from '../../components/registration/Registration';
import Signup from '../../components/forms/registration/Signup';
import SuspenseFallback from '../../components/suspense_fallback/SuspenseFallback';

//media.
import singers from "../../media/videos/singingGroup.mp4";
import musicians from "../../media/videos/musicians.mp4"

import "./RegistrationPage.styles.css";

const RegistrationPage = () => {
   const [registrationModal, setRegistrationModal] = useState({ signUp: false, login: false });
   const toggleSignupModal = () => setRegistrationModal(prv => ({ ...prv, signUp: !registrationModal.signUp }));
   const toggleLoginModal = () => setRegistrationModal(prv => ({ ...prv, login: !registrationModal.login }));

   return (
      <div className='registration-page-div py-5'>
         <Suspense fallback={<SuspenseFallback />}>
            <Signup text="SIGN UP!!!" registrationModal={registrationModal} toggle={toggleSignupModal} />
            <div className='registration-buttons-div'>
               <Registration title="REGISTER" link={singers} mediaFormat="uploadedVideo" toggle={toggleSignupModal} />
               <Registration title="LOGIN" link={musicians} mediaFormat="uploadedVideo" toggle={toggleLoginModal} />
            </div>
         </Suspense>
      </div>
   )
}

export default RegistrationPage