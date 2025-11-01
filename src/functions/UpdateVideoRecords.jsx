import { calculateHighestVote, updateVideoRecords } from "../components/home/active-challenge/functions";

const UpdateVideoRecordInState = (videoToUpdate, videoStatus) => {
   try {
      if (!videoToUpdate.record) throw new Error(`${videoToUpdate} has NO 'record' property!!! in UpdateVideoRecordInState`);

      const { record } = videoToUpdate;

      const previousRecord = record;

      switch (videoStatus) {
         case 'WINNER':
            record.wins += 1;
            break;
         case 'LOSER':
            record.losses += 1;
            break;
         case 'TIE':
            record.ties += 1;
            break;
         default:
            throw new Error(`ERROR IN UpdateVideoRecordInState: videoStatus MUST be 'WINNER', 'LOSER' or 'TIE'!!! You have ${videoStatus}.`);
      }
      
      record.winPct = record.wins / (record.wins + record.losses + record.ties);
      const updatedVideo = { ...videoToUpdate, record };

      return { _videoID: videoToUpdate.id, previousRecord, newRecord: record, oldVideo: videoToUpdate, updatedVideo };

   } catch (error) {
      console.error({ message: `UNABLE TO UPDATE `, errorMessage: error.message, errorName: error.name, errorStackTrace: error.stack });

      return { videoToUpdate, videoStatus };
   }
} //{ _videoID: videoToUpdate.id, previousRecord, newRecord: record, oldVideo: videoToUpdate, updatedVideo };

export const handleVideoRecordsUpdateInDBandState = (expiredChallenges, videos) => {
   const allExpiredChallengeVideos = expiredChallenges.map(expiredChallenge => {
      const highestVote = calculateHighestVote(expiredChallenge.videosInChallenge)
      return updateVideoRecords(expiredChallenge, videos)
   })
      .reduce((accumulator, array) => {
         accumulator = [...accumulator, ...array];
         return accumulator; //[{video, finalStatus, record, id}];
      }, [])
      .map(videoProps => {
         const videoToUpdate = videos.find(({ id }) => id == videoProps.id);
         
         return UpdateVideoRecordInState(videoToUpdate, videoProps.finalStatus);
      })
   
   return allExpiredChallengeVideos
}