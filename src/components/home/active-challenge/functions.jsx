import { UpdateDataAPI } from "../../../functions/updateapi";
import { deleteObjectAPI } from "../../../functions/deleteapi";

export const addVoteToVideoLogic = (videosInChallegeState, targetID) => videosInChallegeState.map(challengeVideo => {
   if (challengeVideo.id == targetID) challengeVideo.challengeAccessories.votes += 1;
   return challengeVideo;
})

export const calculateHighestVote = (videosInChallegeState) => {
   const ArrayOfVotes = videosInChallegeState.map(({ challengeAccessories: { votes } }) => votes);
   return Math.max(...ArrayOfVotes);
}

export const challengeHasEnded = (videoID, dateDifference, votes, WinningVotes) => {   
   if (Number(dateDifference <= 0)) return true;
   else if (WinningVotes && (votes == WinningVotes)) return true;
   return false;
}

export const endChallengeLogic = async (arg, findLeaders, url, deleteObjectAPI=deleteObjectAPI) => {
   try {
      alert(`CHALLENGE HAS ENDED!!! \nHERE ARE YOUR LEADERS AND LOSERS: \n ${JSON.stringify(findLeaders)}.`);
      const deleteChallenge = await deleteObjectAPI(url)
      return deleteChallenge
   } catch (error) {
      console.error({ error, errorCode: error.code, errorMessage: error.message });
   }
}

export const findLeaders = (videosInChallenge, calculateHighestVote) => {
   const leaders = videosInChallenge.filter(({ challengeAccessories: { votes } }) => votes == calculateHighestVote);
   const losers = videosInChallenge.filter(({ challengeAccessories: { votes } }) => votes != calculateHighestVote);

   return { highestVote: calculateHighestVote, leaders, losers, isTie: leaders.length > 1 };
}

export const updateDatabaseAndState = async (CRUD_action, url, setStateWrapperFunction, data = null) => {
   try {
      const updateDB = await CRUD_action(url, data);
      setStateWrapperFunction()
      return { message: "updateDatabseAndState SUCCESS!!!", updateDB };
   } catch (error) {
      console.error({error})
      return { error, errorCode: error.code, errorMessage: error.message };
   }
}