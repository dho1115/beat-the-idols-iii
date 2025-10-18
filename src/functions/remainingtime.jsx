export const findExpiredChallenges = (activeChallenges, promise) => {
   return activeChallenges.map(({challengeEndsOn, _challengeID}) => challengeEndsOn)
}

export const timeRemaining = (DateTime_Object, challengeEndsOn, ...args) => DateTime_Object.fromISO(challengeEndsOn).diff(DateTime_Object.now(), ['days']);