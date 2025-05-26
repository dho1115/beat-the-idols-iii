import { useEffect, useState } from "react";

export function useFetch(url, initial=[]) {
   const [data, setData] = useState(initial);

   useEffect(() => {
      fetch("http://localhost:3003/currentChallenges")
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