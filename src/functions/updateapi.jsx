export const UpdateDataAPI = (url, updatedData) => fetch(url, {
   method: 'PUT',
   headers: {
      'Content-Type': 'application/json'
   },
   body: JSON.stringify(updatedData)
})
   .then(result => {
      if (result.ok) {
         console.log({ message: "SUCCESS!!!", result });
         return result.json()
      } else {
         throw new Error(`ERROR with UpdateDataAPI call!!! result.ok returned ${result.ok} - status: ${result.status} - JSON is ${JSON.stringify(result.json())}.`)
      }
   })
   .catch(error => console.error({ errorMessage: error.message }))

export const UpdateDataInDBThenSetState = async (url, updatedData, setStateWrapper) => {
   try {
      const updateDB = await UpdateDataAPI(url, updatedData);
      if (updateDB.ok) {
         setStateWrapper(updatedData)
      }
      return updateDB;
   } catch (error) {
      console.error({ message: "UpdateDataInDBThenSetState ERROR!!!", error, errorMessage: error.message, errorCode: error.code });
   }
}