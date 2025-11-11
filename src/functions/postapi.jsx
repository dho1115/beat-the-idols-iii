export const PostDataAPI = async (url, data) => {
   try {
      const jsonData = JSON.stringify(data);
      const postData = await fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: jsonData
      }); //POST method.
      
      console.log({ message: 'PostDataAPI success!!!', jsonData, postData });

      return { message: 'usePost success!!!', jsonData, postData, postDataJSON: postData.json() };
   } catch (error) {
      console.error({ message: 'Error in PostDataAPI function', error, errorCode: error.code, status: error.status, errMessage: error.message });

      return { error, errorCode: error.code, errorMessage: error.message };
   }
}