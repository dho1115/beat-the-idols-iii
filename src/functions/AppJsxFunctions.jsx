import { calculateHighestVote, updateFinalStatusesForVideos, updateRecordInVideosState, updateVideoRecords } from "../components/home/active-challenge/functions";
import { fetchDataAPI, fetchDataThenSetState } from "./fetchapi";
import { PatchDataAPI } from "./patchapi";
import { PostDataAPI } from "./postapi";
import { timeRemaining } from "./remainingtime";
import { UpdateDataInDBThenSetState } from "./updateapi";
import { findExpiredChallenges } from "./remainingtime";
import { deleteObjectAPI } from "./deleteapi";

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
         const leadersAndLosers = updateVideoRecords(expiredChallenge, videos); //add 1 to win/loss/tie and calculates record.
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

export const videosFromExpiredChallenges = (activeChallenges, DateTime) => findExpiredChallenges(activeChallenges, DateTime).reduce((acc, expiredChallenge) => {
   const { videosInChallenge } = expiredChallenge;
   acc = [...acc, ...videosInChallenge];
   
   return acc;
}, [])

export const handleExpiredActiveChallenges = async (expiredChallenges, videos, currentChallenges, DateTime, setVideosWrapper, location) => {
   try {
      if (typeof (setVideosWrapper) != 'function') throw new Error({ message: `ERROR INSIDE handleExpiredActiveChallenges!!! The argument, setVideosWrapper is NOT a function. It is a ${typeof (setVideosWrapper)}.`, location });

      if (currentChallenges.length && expiredChallenges.length && videos.length) {
         const challengeVideosFinalStatuses = expiredChallenges
            .map(expiredChallenge => updateFinalStatusesForVideos(expiredChallenge, location.pathname)).reduce((accumulator, array) => {
               accumulator = [...accumulator, ...array];
               return accumulator;
            }, []) //[{WINNER/LOSER/TIE, _videoID, video_data}]
         
         challengeVideosFinalStatuses.forEach(async ({ _videoID, finalStatus }) => {
            const { record } = videos.find(({ id }) => id == _videoID);
            const { wins, losses, ties } = record;
            if (finalStatus == 'WINNER') {
               const wins_updated = wins + 1;
               const winPct_updated = (wins_updated) / (wins_updated + losses + ties);
             
               await PatchDataAPI(`http://localhost:3003/videos/${_videoID}`, { record: { ...record, wins: wins_updated, winPct: winPct_updated } });
            }
            else if (finalStatus == 'LOSER') {
               const losses_updated = losses + 1;
               const winPct_updated = wins / (wins + losses_updated + ties);
             
               await PatchDataAPI(`http://localhost:3003/videos/${_videoID}`, { record: { ...record, losses: losses_updated, winPct: winPct_updated } });
            }
            else {
               const ties_updated = ties + 1;
               const winPct_updated = wins / (wins + losses + ties_updated);
             
               await PatchDataAPI(`http://localhost:3003/videos/${_videoID}`, { record: { ...record, ties: ties_updated, winPct: winPct_updated } });
            }
         })
   
         await fetchDataThenSetState(fetchDataAPI, "http://localhost:3003/videos", data => setVideosWrapper(data))
            .then(data => {
               if (data.length) {
                  expiredChallenges.forEach(({ id }) =>
                     deleteObjectAPI(`http://localhost:3003/activeChallenges/${id}`))
               }
               else throw new Error(`ERROR!!! data has not set (yet) inside fetchDataThenSetState function. data is still ${JSON.stringify(data)}.`)
            })
            .catch(error => console.error({ message: 'fetchDataThenSetState ERROR!!!', error, errorMessage: error.message, errorName: error.name, errorCode: error.code }));
      }

      return { expiredChallenges, videos, currentChallenges };
   } catch (error) {
      console.error({ message: "ERROR inside handleExpiredActiveChallenges function!!!!!", location, expiredChallenges, function_arguments: { videos, currentChallenges, DateTime, setVideosWrapper }, error, errorName: error.name, errorMessage: JSON.stringify(error.message), stackTrace: error.stack });
   }
}

export const findExpiredAnnouncements = (challengeAnnouncements, DateTime) => {
   try {
      const expiredAnnouncements = challengeAnnouncements.filter(({ announcement }) => timeRemaining(DateTime, announcement.announcementEndsOn) < 0);
      
      return expiredAnnouncements;
   } catch (error) {
      console.error({ message: "ERROR in findExpiredAnnouncements call!!!", error, errorMessage: error.message, errorName: error.name });
   }
}

export const handleExpiredChallengeAnnouncements = async (url_to_delete, data, setStateActiveChalenges, setStateChallengeAnnouncements, location=null) => {
   try {
      const post_response = await PostDataAPI("http://localhost:3003/activeChallenges", data);
      const { postData, postDataJSON } = post_response;
      const delete_response = await deleteObjectAPI(url_to_delete);
      const { result } = delete_response;
      const challengeAnnouncementData = await fetchDataAPI("http://localhost:3003/challengeAnnouncements");

      if (postData.ok) setStateActiveChalenges(postDataJSON);

      if (result.ok) setStateChallengeAnnouncements(challengeAnnouncementData);

      return { activeChallenges_values: { postData, postDataJSON }, challengeAnnouncements_values: { challengeAnnouncementData }, delete_response };
   } catch (error) {
      console.error({ message: "ERROR from handleExpiredChallengeAnnouncements!!!", locationOfError: location, error, errorMessage: error.message, errorName: error.name });
   }
}
   
