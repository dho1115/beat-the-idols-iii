import { calculateHighestVote, updateRecordInVideosState, updateVideoRecords } from "../components/home/active-challenge/functions";
import { UpdateDataAPI, UpdateDataInDBThenSetState } from "./updateapi";

export const FetchDB = async (fetchDataAPI, url) => {
   try {
      return await fetchDataAPI(url);
   } catch (error) {
      console.error({ message: "error in fetchDB.", error, errorCode: error.code, errorMessage: error.message });
   }
}

export const InitialFetchDBandUpdateState = (fetchDataAPI, url, setStateWrapper, name_of_state = null) => FetchDB(fetchDataAPI, url)
   .then(response => {
      setStateWrapper(response);
      return { message: `Successfully fetched ${JSON.stringify(response)}!!!`, response };
   })
   .catch(error => {
      console.error({ message: `Error inside InitialFetchDBandUpdateState while trying to set ${name_of_state} state!!!`, error, errorCode: error.code, errorMessage: error.message });
   })

export const UpdateAllVideos = (expired_challenges, videos, link, setVideosWrapper) => {

   return Promise.all(
      expired_challenges.map(expiredChallenge => {
         const { videosInChallenge } = expiredChallenge; //destructure videosInChallenge prop.
         const highestVote = calculateHighestVote(videosInChallenge); //highest vote.
         const leadersAndLosers = updateVideoRecords(expiredChallenge, highestVote); //add 1 to win/loss/tie and calculates record.
         const videos_updated = updateRecordInVideosState(videos, leadersAndLosers); //updates videos state with leadersAndLosers.

         return UpdateDataInDBThenSetState(UpdateDataAPI, link, videos_updated, setVideosWrapper);
      })
   )
}

export const unexpired_challenges = (expired_challenges, active_challenges) => {
   const expired_challenges_ids = expired_challenges.map(({ id }) => id);

   return active_challenges.filter(val => !expired_challenges_ids.includes(val.id));
}
