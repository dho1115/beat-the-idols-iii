import { useLocation, useState } from "react-router-dom"

const useLoggedInRoutes = (arrayOfRoutes=[]) => {
   const location = useLocation();
   const currentLocation = location.pathname;

   const [loggedInRoutes, setLoggedInRoutes] = useState({ allRoutes: [], nonCurrentRoutes: loggedInRoutes.allRoutes.length ? loggedInRoutes.allRoutes.filter(value => value.pathame != currentLocation) : [] })
   
   return [loggedInRoutes, setLoggedInRoutes];
}