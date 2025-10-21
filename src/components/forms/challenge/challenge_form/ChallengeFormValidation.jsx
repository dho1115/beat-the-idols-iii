import React, { useContext } from 'react'

//components
import ChallengeForm from './ChallengeForm';

import { dataContext } from '../../../../App'

const ChallengeFormValidation = () => {
   const { videos, currentUser } = useContext(dataContext);
   const findCurrentUsersVideos = videos.filter(({ _userID }) => _userID == currentUser.id);

   if (findCurrentUsersVideos.length) {
      return <ChallengeForm />
   }

   return (
      <div>
         <h1>You cannot create a challenge unless you upload some videos!!!</h1>
      </div>
   )
}

export default ChallengeFormValidation