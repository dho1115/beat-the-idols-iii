export const usePost = async (url, data, setStateFn = null) => {
   try {
      const jsonData = JSON.stringify(data);
      const postData = await fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: jsonData
      }); //POST method.
      setStateFn && setStateFn(data); //set state function.
      console.log({ message: 'usePostSuccess!!!', jsonData, postData });

      return { message: 'usePost success!!!', jsonData, postData };
   } catch (error) {
      console.error({ message: 'Error in usepost function', error, errorCode: error.code, status: error.status, errMessage: error.message });

      return { error, errorCode: error.code, errorMessage: error.message };
   }
}