export const hasChallengeEnded = (videoID, todaysDate, challengeEndsOn, votes, WinningVotes) => {
   console.log({ videoID, todaysDate, challengeEndsOn, areDatesEqual: todaysDate == challengeEndsOn, votes, WinningVotes, areVotesEqual: votes == WinningVotes });
   
   if (todaysDate == challengeEndsOn) return true;
   else if (votes == WinningVotes) return true;
   return false;
}