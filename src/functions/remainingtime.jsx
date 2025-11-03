export const timeRemaining = (DateTime_Object, challengeEndsOn, ...args) => DateTime_Object.fromISO(challengeEndsOn).diff(DateTime_Object.now(), ['days']).days.toFixed(3);

export const findExpiredChallenges = (activeChallenges, DateTime_Object) => activeChallenges.filter(({ challengeEndsOn }) => timeRemaining(DateTime_Object, challengeEndsOn) <= 15); //[[], [], []]

export const deleteExpiredChallenges = (expiredChallenges, deletePromise) => expiredChallenges.map(({ _challengeID }) => deletePromise(`http://localhost:3003/activeChallenges/${_challengeID}`));