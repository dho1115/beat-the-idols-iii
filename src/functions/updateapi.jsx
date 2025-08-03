export const UpdateDataAPI = (url, updatedData) => fetch(url, {
   method: 'PUT',
   headers: {
      'Content-Type': 'application/json'
   },
   body: JSON.stringify(updatedData)
}).then(result => console.log({message: "SUCCESS!!!", result})).catch(error => console.error({errorMessage: error.message}))