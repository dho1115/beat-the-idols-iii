export const addVoteToVideoLogic = (videosInChallegeState, targetID) => videosInChallegeState.map((targetVideo) => {
   if (targetVideo.id == targetID) targetVideo.challengeAccessories.votes += 1;
   return targetVideo;
})

export const challengeHasEnded = (videoID, dateDifference, votes, WinningVotes) => {   
   if (Number(dateDifference <= 0)) return true;
   else if (WinningVotes && (votes == WinningVotes)) return true;
   return false;
}

export const endChallengeLogic = (arg) => {
   alert(`CHALLENGE HAS ENDED!!! RESULTS ARE: ${JSON.stringify(arg)}.`)
}