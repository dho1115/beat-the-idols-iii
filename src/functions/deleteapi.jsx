export const deleteObjectAPI = url => fetch(url, {
   method: 'DELETE'
})
   .then(result => {
      if (result.ok) console.log({ message: `${url} has been deleted!!!`, result })
      
      else console.error("delete is NOT ok:", result);

      debugger;
      return { result, url };
   })
   .catch(error => console.error({ message: `Error deleting ${url}...`, error, errorCode: error.code, errorMessage: error.message }));