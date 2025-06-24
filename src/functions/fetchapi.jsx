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