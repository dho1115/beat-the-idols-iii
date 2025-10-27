import { calculateHighestVote, updateRecordInVideosState, updateVideoRecords } from "../components/home/active-challenge/functions";
import { fetchDataAPI } from "./fetchapi";
import { PatchDataAPI } from "./patchapi";
import { UpdateDataAPI, UpdateDataInDBThenSetState } from "./updateapi";

export const FetchDB = async (fetchDataAPI, url) => {
   try {
      return await fetchDataAPI(url);
   } catch (error) {
      console.error({ message: "error in fetchDB.", error, errorCode: error.code, errorMessage: error.message });
   }
}

export const InitialFetchDBandUpdateState = (url, setStateWrapper, name_of_state = null, state=null, ...args) => fetchDataAPI(url)
   .then(jsonData => {
      setStateWrapper(jsonData);

      return { name_of_state, state, jsonData };
   })
   .catch(error => {
      console.error({ message: `Error inside InitialFetchDBandUpdateState while trying to set ${name_of_state} state!!!`, error, errorCode: error.code, errorMessage: error.message, "errorStack": error.stack });
   })

export const PatchDataAndSetState = async (url, newDataFragment, setStateWrapper) => {
   try {
      const patchData = await PatchDataAPI(url, newDataFragment);
      const fetchData = await fetchDataAPI(url);
      setStateWrapper(fetchData);
      return { message: "PatchDataAndSetState success!!!", setStateWrapper, fetchData };
   } catch (error) {
      console.error({ message: "PatchDataAndSetState Error!!!", TraceStack: error.stack, ErrorMessage: error.message, ErrorCode: error.code });
   }
}

export const UpdateAllVideos = (expired_challenges, videos, link, setVideosWrapper) => {

   return Promise.all(
      expired_challenges.map(expiredChallenge => {
         const { videosInChallenge } = expiredChallenge; //destructure videosInChallenge prop.
         const highestVote = calculateHighestVote(videosInChallenge); //highest vote.
         const leadersAndLosers = updateVideoRecords(expiredChallenge, highestVote, videos); //add 1 to win/loss/tie and calculates record.
         const videos_updated = updateRecordInVideosState(videos, leadersAndLosers); //updates videos state with leadersAndLosers.

         return UpdateDataInDBThenSetState(link, videos_updated, setVideosWrapper)
            .then(data => Promise.all(data.map(({ id, record }) => PatchDataAPI(`http://localhost:3003/videos/${id}`, { record }))))
            .then(result => console.log("Promse.all SUCCESS in UpdateDataInDBThenSetState!!! Result is:", result))
            .catch(error => console.error({ message: "error in update all videos!!!", videos, videosInChallenge, error, errorCode: error.code, errorMessage: error.message }))
      })
   )
}

export const unexpired_challenges = (expired_challenges, active_challenges) => {
   const expired_challenges_ids = expired_challenges.map(({ id }) => id);

   return active_challenges.filter(val => !expired_challenges_ids.includes(val.id));
}
