export const addVoteToVideoLogic = (videosInChallegeState, targetID) => videosInChallegeState.map(challengeVideo => {
   if (challengeVideo.id == targetID) challengeVideo.challengeAccessories.votes += 1;
   return challengeVideo;
})

export const calculateHighestVote = (videosInChallegeState) => {
   const ArrayOfVotes = videosInChallegeState.map(({ challengeAccessories: { votes } }) => votes);
   return Math.max(...ArrayOfVotes);
}

const leadersAndlosers_videos = videosInChallenge => {
   const leadersAndlosers = {}
   try {
      const leaders = videosInChallenge.filter(({ challengeAccessories: { votes } }) => votes == calculateHighestVote(videosInChallenge));
      const losers = videosInChallenge.filter(({ challengeAccessories: { votes } }) => votes < calculateHighestVote(videosInChallenge));

      leadersAndlosers.leaders = leaders;
      leadersAndlosers.losers = losers;
   
      return { leaders, losers };
   } catch (error) {
      console.error({ message: 'ERROR in leaders and LOSERS!!!', leadersAndlosers, HighestVote: calculateHighestVote(videosInChallenge), errorMessage: error.message, errorStack: error.stack });
   }
}

export const updateVideoRecords = (expiredChallenge, videos) => {
   const { videosInChallenge } = expiredChallenge;
   try {
      const { leaders, losers } = leadersAndlosers_videos(videosInChallenge);

      if (leaders.length < 1) throw Error(`const leaders returned: ${leaders}!!! Please debug updateVideoRecords!!!`)

      const updatedLeadersArray = leaders.map(video => {
         const { id, challengeAccessories } = video;
         const { record } = videos.find(video => video.id == id); //record from matching video in videos state.

         if (leaders.length > 1 /* TIE!!! */) {
            //update ties and finalStatus for this video record in the state.
            record.ties += 1;
            record.winPct = record.wins / (record.wins + record.losses + record.ties);
            challengeAccessories.finalStatus = 'TIE'
            return { video, finalStatus: 'TIE', record, id };
         }

         challengeAccessories.finalStatus = 'WINNER'
         record.wins += 1;
         record.winPct = record.wins / (record.wins + record.losses + record.ties);

         return { video, finalStatus: 'WINNER', record, id };
      })

      const updatedLosersArray = losers.length > 0 ? losers.map(video => {
         const { id } = video;
         const { record } = videos.find(video => video.id == id);
         record.losses += 1;
         record.winPct = record.wins / (record.losses + record.ties);

         return { video, finalStatus: 'LOSER', record, id };
      }) : []

      return [...updatedLeadersArray, ...updatedLosersArray];
   } catch (error) {
      console.error({ message: 'updateVideoRecordError!!!', error, errorMessage: error.message, errorCode: error.code });
      return [];
   }
} //[{record, id}];

export const updateFinalStatusesForVideos = (expiredChallenge, pathname) => {
   const { videosInChallenge } = expiredChallenge;
   try {
      const { leaders, losers } = leadersAndlosers_videos(videosInChallenge);

      if (leaders.length < 1) throw Error(`const leaders returned: ${leaders}!!! Please debug updateVideoRecords!!!`)

      const finalStatusLeaders = leaders.map(leaderVideo => {
         const { id, challengeAccessories } = leaderVideo;

         if (leaders.length > 1) {
            challengeAccessories.finalStatus = 'TIE'
            return { video_data: leaderVideo, id, finalStatus: 'TIE', _videoID: id};
         } // TIE!!!

         challengeAccessories.finalStatus = 'WINNER'
         return { video_data: leaderVideo, finalStatus: 'WINNER', _videoID: id}; // WINNER!!!
      })

      const finalStatusLosers = losers.length ? losers.map(loserVideo => {
         const { id, challengeAccessories } = loserVideo;
         challengeAccessories.finalStatus = "LOSER";
         return { video_data: loserVideo, id, finalStatus: 'LOSER', _videoID: id };
      }) : []

      return [...finalStatusLeaders, ...finalStatusLosers];
   } catch (error) {
      console.error({ message: 'updateFinalStatusesForVideos', where: pathname, error, errorMessage: error.message, stack: error.stack, errorCode: error.code });
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