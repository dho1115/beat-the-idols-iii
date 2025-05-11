import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"

export const useGeneralRoutes = (routes) => {
   const location = useLocation();
   const currentLocation = location.pathname;

   const [generalRoutes, setGeneralRoutes] = useState([...routes]);

   return [generalRoutes, setGeneralRoutes];   
}

export const useLoggedInRoutes = () => {
   const location = useLocation();
   const currentLocation = location.pathname;

   const [loggedInRoutes, setLoggedInRoutes] = useState({ allRoutes: [], nonCurrentRoutes: loggedInRoutes.allRoutes.length ? loggedInRoutes.allRoutes.filter(value => value.pathame != currentLocation) : [] })
   
   return [loggedInRoutes, setLoggedInRoutes];
}