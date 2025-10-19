export const UpdateDataAPI = (url, updatedData) => fetch(url, {
   method: 'PUT',
   headers: {
      'Content-Type': 'application/json'
   },
   body: JSON.stringify(updatedData)
})
   .then(result => console.log({ message: "SUCCESS!!!", result }))
   .catch(error => console.error({ errorMessage: error.message }))

export const UpdateDataInDBThenSetState = async (UpdateDataAPI, url, updatedData, setStateWrapper) => {
   try {
      const updateDB = await UpdateDataAPI(url, updatedData);
      setStateWrapper(updatedData)
      return updatedData;
   } catch (error) {
      console.error({ message: "UpdateDataInDBThenSetState ERROR!!!", error, errorMessage: error.message, errorCode: error.code });
   }
}