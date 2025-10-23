import { UpdateDataInDBThenSetState } from "../../../functions/updateapi";
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
      const leaders = videosInChallenge.filter(({ challengeAccessories: { votes } }) => votes == highestVote);

      const losers = videosInChallenge.filter(({ challengeAccessories: { votes } }) => votes < highestVote);

      if (leaders.length < 1) throw Error(`const leaders returned: ${leaders}!!! Please debug updateVideoRecords!!!`)

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
} //[{ id, record: UPDATED!!!, title, urlOrFile: link, username, videoType }];

export const updateRecordInVideosState = (videos, updateVideoRecords) => {
   try {
      const { updatedVideoData } = updateVideoRecords;

      const videos_updated = videos.map(video => {
         const updatedData = updatedVideoData.find(({ id }) => (id == video.id));
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
      const updateDB = await CRUD_action(url, data);
      setStateWrapperFunction()
      return { message: "updateDatabseAndState SUCCESS!!!", updateDB };
   } catch (error) {
      console.error({error})
      return { error, errorCode: error.code, errorMessage: error.message };
   }
}