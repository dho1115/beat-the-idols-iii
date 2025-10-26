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
      const response = await fetchDataAPI(url);
      const data = response.json();
      setStateWrapper(data);
      return data;
   } catch (error) {
      console.error({ message: 'fetchDataThenSetState ERROR!!!', error, errorCode: error.code, errorMessage: error.message });
   }
}