import { useEffect, useState } from "react";

export const useFetch(url, initial) {
   const [data, setData] = useState(initial);

   useEffect(() => {
     fetch(url).then(res => {
      if (!res.ok) {
         throw new Error(`ERROR!!! ${res.status}.`)
      }
      return res.json()
     }).then(result => {
        console.log("SUCCESS!!! ", result);
        setData(result)
     })
   
     return () => {
     }
   }, [])
   
   return [data, setData]
}