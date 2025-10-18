export const findExpiredChallenges = (activeChallenges, DateTime_Object, timeRemainingFunc) => activeChallenges.filter(({ challengeEndsOn }) => timeRemainingFunc(DateTime_Object, challengeEndsOn)) <= 0;

export const timeRemaining = (DateTime_Object, challengeEndsOn, ...args) => DateTime_Object.fromISO(challengeEndsOn).diff(DateTime_Object.now(), ['days']);