import React, { useContext } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Container } from 'reactstrap';

//components.
import ActiveChallengeDetails from './ActiveChallengeDetails';

import { dataContext } from '../../../App';

import "../Challenges.styles.css"

const ActiveChallenge = () => {
   const { _challengeID } = useParams();
   const { currentChallenges } = useContext(dataContext);

   const validateParams = currentChallenges.find(({ id }) => id == _challengeID) //validate if the challenge id exists.

   if (validateParams) return <ActiveChallengeDetails />
   return <Navigate to="/" replace={false} />
}

export default ActiveChallenge