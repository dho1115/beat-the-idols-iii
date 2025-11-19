export const fetchDataAPI = async url => {
   try {
      const rawData = await fetch(url);

      if (rawData.ok) {
         const jsonData = await rawData.json();
         return jsonData;
      } else throw new Error(`fetchDataAPI call error (fetchapi.jsx)!!! rawData.ok returned ${rawData.ok} while status code is ${rawData.status}!!!`);
   } catch (error) {
      console.error({ from: 'fetchDataAPI (fetchapi.jsx)', error, errorCode: error.code, errorMessage: error.message, status: error.status });

      return { from: 'fetchDataAPI (fetchapi.jsx)', error, errorCode: error.code, errorMessage: error.message };
   }
}

export const fetchDataThenSetState = async (fetchDataAPI, url, setStateWrapper) => {
   try {
      const data = await fetchDataAPI(url);
      
      if (typeof (data) != 'object') throw new Error(`ERROR INSIDE fetchDataThenSetState (fetchapi.jsx): data should be a function. Instead, it is of type ${typeof (data)}.`)
      
      setStateWrapper(data);
      return data;
   } catch (error) {
      console.error({ message: 'fetchDataThenSetState ERROR!!!', error, errorCode: error.code, errorMessage: error.message });
   }
}