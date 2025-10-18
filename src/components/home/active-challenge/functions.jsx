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

export const updateVideoRecords = (expiredChallenge, highestVote) => {
   const { videosInChallenge } = expiredChallenge;
   try {
      const leaders = videosInChallenge.map(({ challengeAccessories: { votes } }) => votes == highestVote);

      const losers = videosInChallenge.map(({ challengeAccessories: { votes } }) => votes < highestVote);

      const updateLeaders = leaders.map(({ challengeAccessories, record, ...rest }) => {
         if (leaders.length > 1) {
            record.ties += 1;
            record.winPct = record.wins / (record.wins + record.losses + record.ties);
            return { record, ...rest };
         } //tie logic.
         record.wins += 1;
         record.winPct = record.wins / (record.wins + record.losses + record.ties); //win logic
         return { record, ...rest };
      })

      const updateLosers = losers.length > 0 ? losers.map(({ challengeAccessories, record, ...rest }) => {
         record.losses += 1;
         record.winPct = record.wins / (record.wins + record.losses + record.ties);
         return { record, ...rest };
      }) : [];
      return { updatedVideoData: [...updateLeaders, ...updateLosers] };
   } catch (error) {
      console.error({ message: 'updateVideoRecordError!!!', error, errorMessage: error.message, errorCode: error.code });
      return { updatedVideoData: [] };
   }
}

export const challengeHasEnded = (videoID, dateDifference, votes, WinningVotes) => {   
   if (Number(dateDifference <= 0)) return true;
   else if (WinningVotes && (votes == WinningVotes)) return true;
   return false;
}

export const endChallengeLogic = async (arg, findLeaders, url, deleteObjectAPI=deleteObjectAPI) => {
   try {
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