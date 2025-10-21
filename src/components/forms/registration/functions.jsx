import { PostDataAPI } from "../../../functions/postapi"

export const PostRequestToDB = async (id, currentUser, url, setStateWrapper, errorLocation=null) => {
   const currentUser_updated = { ...currentUser, id };
   try {
      const addToDB = await PostDataAPI(url, currentUser_updated);
      setStateWrapper();
      return addToDB;
   } catch (error) {
      if (errorLocation) console.error({ from: errorLocation, message: "PostRequestToDB function error!!!", error, errorCode: error.code, errorMessage: error.message });

      else console.error({ message: "PostRequestToDB function error!!!", error, errorCode: error.code, errorMessage: error.message });
   }
}