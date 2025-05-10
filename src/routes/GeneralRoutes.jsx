import { useLocation, useState } from "react-router-dom"

const useGeneralRoutes = (arrayOfRoutes=[]) => {
   const location = useLocation();
   const currentLocation = location.pathname;

   const [generalRoutes, setGeneralRoutes] = useState({ allRoutes: [], nonCurrentRoutes: generalRoutes.allRoutes.length ? generalRoutes.allRoutes.filter(value => value.pathame != currentLocation) : [] });
   
   return [generalRoutes, setGeneralRoutes];
}