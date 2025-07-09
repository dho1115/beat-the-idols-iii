export const welcomeNavbarLinks = (username = null, id = null, ...args) => {
   let options = args;
   if (args.length) options.reduce((accumulator, current) => {
      accumulator = { ...accumulator, ...current };
      return accumulator;
   }, {});

   const baseRoutes= [
      { name: 'welcome', path: '/' },
      { name: 'home', path: '/home' },
      { name: 'about', path: '/about' },
      { name: 'contact', path: '/contact' }
   ];
   const loggedInRoutes = (id && username)
      ? 
      [{ name: `${username}'s homepage`, path: `/currentUser/${username}` }, {name: 'LOGOUT', path: "/", onClick: () => console.log("LOGOUT LOGIC HERE!!!")}]
      :
      [{ name: 'LOGIN/SIGN UP!!!', path: '/register' }]
   
   return [...baseRoutes, ...loggedInRoutes];
}