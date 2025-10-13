export const challengeHasEnded = (videoID, dateDifference, votes, WinningVotes) => {
   console.log({ videoID, dateDifference, differenceGreaterThanZero: Number(dateDifference) > 0 });
   
   if (Number(dateDifference <= 0)) return true;
   else if (WinningVotes && (votes == WinningVotes)) return true;
   return false;
}