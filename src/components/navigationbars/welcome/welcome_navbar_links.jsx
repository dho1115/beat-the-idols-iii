export const welcomeNavbarLinks = (username = null, id = null, ...args) => {
   let options = Array.from(args => args).reduce((acc, value) => {
      acc[value] = value;
      return acc;
   }, {});

   if (args.length) {
      options = options.reduce((accumulator, current) => {
         accumulator = { ...accumulator, ...current };
         return accumulator;
      }, {})
   };
   const baseRoutes= [
      { name: 'welcome', path: '/' },
      { name: 'home', path: '/home' },
      { name: 'about', path: '/about' },
      { name: 'contact', path: '/contact' }
   ];
   const loggedInRoutes = (id && username)
      ?
      [{ name: `${username}'s homepage`, path: `/currentUser/${id}` }, {name: 'LOGOUT', path: "/", onClick: options.logoutLogic}, {name: 'challenge videos', path: `/currentUser/${id}//view/challengeVideos/${options.all}`}]
      :
      [{ name: 'LOGIN/SIGN UP!!!', path: '/register' }]
   
   return [...baseRoutes, ...loggedInRoutes];
}