import { useEffect, useState } from "react";

export function useFetch(url, initial=[]) {
   const [data, setData] = useState(initial);

   useEffect(() => {
      fetch(url)
         .then(res => {
            if (!res.ok) {
               throw new Error(`ERROR!!! ${res.status}.`)
            }
            return res.json()
         }).then(result => {
            console.log("SUCCESS!!! ", result);
            setData(result)
         }).catch(error => console.error({ error, errorCode: error.code, errorMessage: error.errorMessage }));
   
     return () => {
     }
   }, [])
   
   return [data, setData]
}

export function usePost(url, data) {
   const body = JSON.stringify(data);

   useEffect(() => {
      fetch({
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body
      })
         .then(res => {
            if (!res.ok) {
               throw new Error(`HTTP Error!!! => ${res.status}.`)
            }

            return res.json()
         })
         .then(result => console.log(`SUCCESS!!! Result is ${result}.`))
         .catch(error => console.error({ message: 'ERROR CAUGHT!!!', error, errorMessage: error.message, errorCode: error.code }));
   }, [])

   return `Successfully posted ${body} to ${url}.`;
}