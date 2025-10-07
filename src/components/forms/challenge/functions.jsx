import { PostDataAPI } from "../../../functions/postapi";

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

//CRUD FUNCTIONS.

export const AddChallengeToDB = (link=null, data=null, setState=null) => {
   const dataTypes = JSON.stringify({ link: typeof (link), data: typeof (data), setState: typeof (setState) });
   try {
      if (typeof(link) != 'string' || typeof(data) != 'object' || typeof(setState) != 'function') throw new Error(`Wrong data type for one or more of the arguments. link and data must be a string and setState must be a function. You have: ${dataTypes}.`)

      return PostDataAPI(link, data)
         .then(result => setState(prv => ([...prv, result.jsonData])))
         .catch(error => console.error({ error, errorCode: error.code, errorMessage: error.message }));
   }
   catch (err) {
      console.error({ err, errCode: err.code, errMessage: err.message })
      return err;
   }
}