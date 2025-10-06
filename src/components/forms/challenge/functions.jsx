export const defaultExpirationDate = (challengeDetails, challengeAnnouncement, DateTime) => {
      if (challengeDetails.challengeAnnouncementID) {
         const deadlineString = challengeAnnouncement.announcementEndsOn;
         const deadline = DateTime.fromISO(deadlineString)
         const defaultChallengeExpiration = deadline.plus({ months: 5 }).toFormat('yyyy-MM-dd');
         
         return defaultChallengeExpiration;
      }

      const defaultChallengeExpiration = DateTime.local().plus({ months: 5 }).toFormat("yyyy-MM-dd");
      
      return defaultChallengeExpiration;
   }