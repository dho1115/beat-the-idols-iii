export const useFetch = async (url, setStateFnDeclaration = data => console.log(data)) => {
   try {
      const fetchData = await fetch(url);
      const jsonData = await fetchData.json();
      console.log({ message: 'Success from useFetch!!!', fetchData, jsonData });

      console.log('setStateFunctionDeclaration: ', setStateFnDeclaration(jsonData));

      return jsonData;
   } catch (error) {
      console.error({ message: 'useFetch error!!!', error, errorStatus: error.status, errorCode: error.code, errorMessage: error.message });

      return { message: 'useFetch error!!!', error, errorMessage: error.message };
   }
}