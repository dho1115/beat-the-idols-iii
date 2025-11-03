export const fetchDataAPI = async url => {
   try {
      const rawData = await fetch(url);
      const jsonData = await rawData.json();


      return jsonData;
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