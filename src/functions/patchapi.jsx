export const PatchDataAPI = (url, newData) => fetch(url, {
   method: 'PATCH',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(newData)
})
   .then(result => {
      console.log({ message: `SUCCESSFULLY patched ${JSON.stringify(newData)} onto ${url}!!!`, result: result.json() });
   
      return { url, newData };
   })
   .catch(error => console.error({ message: `PatchDataAPI ERROR!!! Unable to patch ${JSON.stringify(newData)} onto ${url}!!!`, error, errorCode: error.code, errorMessage: error.message }));