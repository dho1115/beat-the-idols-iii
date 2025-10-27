import { UpdateDataInDBThenSetState } from "../../../functions/updateapi";
import { deleteObjectAPI } from "../../../functions/deleteapi";
import { PatchDataAndSetState } from "../../../functions/AppJsxFunctions";

export const addVoteToVideoLogic = (videosInChallegeState, targetID) => videosInChallegeState.map(challengeVideo => {
   if (challengeVideo.id == targetID) challengeVideo.challengeAccessories.votes += 1;
   return challengeVideo;
})

export const calculateHighestVote = (videosInChallegeState) => {
   const ArrayOfVotes = videosInChallegeState.map(({ challengeAccessories: { votes } }) => votes);
   return Math.max(...ArrayOfVotes);
}

export const updateVideoRecords = (expiredChallenge, highestVote, videos) => {
   const { videosInChallenge } = expiredChallenge;
   try {
      const leaders = videosInChallenge.filter(({ challengeAccessories: { votes } }) => votes == highestVote);

      const losers = videosInChallenge.filter(({ challengeAccessories: { votes } }) => votes < highestVote);

      if (leaders.length < 1) throw Error(`const leaders returned: ${leaders}!!! Please debug updateVideoRecords!!!`)

      const updatedLeadersArray = leaders.map(({ id }) => {
         const { record } = videos.find(video => video.id == id); //record from matching video in videos state.

         if (leaders.length > 1 /* TIE!!! */) {
            //update ties for this video record in the state.
            record.ties += 1;
            record.winPct = record.wins / (record.wins + record.losses + record.ties);
            return { record, id };
         } else /* WINNER!!! */ {
            //update win for this video record in the state.
            record.wins += 1;
            record.winPct = record.wins / (record.wins + record.losses + record.ties);
         } 

         return { record, id };
      })

      const updatedLosersArray = losers.length > 0 ? losers.map(({ id }) => {
         const { record } = videos.find(video => video.id == id);
         record.losses += 1;
         record.winPct = record.wins / (record.losses + record.ties);

         return { record, id };
      }) : []

      return [...updatedLeadersArray, ...updatedLosersArray];
   } catch (error) {
      console.error({ message: 'updateVideoRecordError!!!', error, errorMessage: error.message, errorCode: error.code });
      return [];
   }
} //[{record, id}];

export const updateRecordInVideosState = (videos, updateVideoRecords) => {
   try {
      const vidRecordsAndIDsUpdated = updateVideoRecords;

      const videos_updated = videos.map(video => {
         const updatedData = vidRecordsAndIDsUpdated.find(({ id }) => (id == video.id));
         const updatedRecord = updatedData.record;

         if (updatedData) return { ...video, record: updatedRecord }
         return video;
      });

      return videos_updated; //[{...video, record: {}}]
   } catch (error) {
      console.error({ message: "updatedSelectedVideoData ERROR!!!", error, errorCode: error.code, errorMessage: error.message });
   }
}

export const endChallengeLogic = async (updateDataInDBThenSetState, UpdateDataAPI, updateDataUrl, updatedData, updateDataSetStateWrapper, deleteObjectAPI, deleteObjectUrl) => {
   try {
      const updateVideosInDB = await updateDataInDBThenSetState(UpdateDataAPI, updateDataUrl, updatedData, updateDataSetStateWrapper);
      const deleteChallenge = await deleteObjectAPI(deleteObjectUrl);

      return deleteChallenge
   } catch (error) {
      console.error({ error, errorCode: error.code, errorMessage: error.message });
   }
}

export const challengeHasEnded = (videoID, dateDifference, votes, WinningVotes) => {   
   if (Number(dateDifference <= 0)) return true;
   else if (WinningVotes && (votes == WinningVotes)) return true;
   return false;
}

export const findLeaders = (videosInChallenge, calculateHighestVote) => {
   const leaders = videosInChallenge.filter(({ challengeAccessories: { votes } }) => votes == calculateHighestVote);
   const losers = videosInChallenge.filter(({ challengeAccessories: { votes } }) => votes != calculateHighestVote);

   return { highestVote: calculateHighestVote, leaders, losers, isTie: leaders.length > 1 };
}

export const updateDatabaseAndState = async (CRUD_action, url, setStateWrapperFunction, data = null) => {
   try {
      if (data == null || !data) throw new Error(`Your data argument(4th argument) cannot be null!!! You have ${data}.`);

      const updateDB = await CRUD_action(url, data);
      setStateWrapperFunction();
      return { message: "updateDatabseAndState SUCCESS!!!", updateDB };
   } catch (error) {
      console.error({error})
      return { error, errorCode: error.code, errorMessage: error.message };
   }
}