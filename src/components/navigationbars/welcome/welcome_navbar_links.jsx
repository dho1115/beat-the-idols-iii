export const welcomeNavbarLinks = (username = null, id = null, ...args) => {
   let options = args;
   if (args.length) {
      options = options.reduce((accumulator, current) => {
         accumulator = { ...accumulator, ...current };
         return accumulator;
      }, {})
   };

   const logoutLogic = async () => {
      try {
         const { PostDataAPI, setCurrentUser, currentUser } = options;
         const postCurrentUser = await PostDataAPI("http://localhost:3003/currentUser", {});
         setCurrentUser({});

         return `Successfully updated currentUser: ${JSON.stringify(currentUser)}. postCurrentUser is ${postCurrentUser}.`
      } catch (err) {
         console.error({ message: 'logoutLogic error!!!', err, errMessage: err.message, errCode: err.code, status: err.status })

         return { err, errMessage: err.message };
      }
   } //function and logic for log out.

   const baseRoutes= [
      { name: 'welcome', path: '/' },
      { name: 'home', path: '/home' },
      { name: 'about', path: '/about' },
      { name: 'contact', path: '/contact' }
   ];
   const loggedInRoutes = (id && username)
      ? 
      [{ name: `${username}'s homepage`, path: `/currentUser/${username}` }, {name: 'LOGOUT', path: "/", onClick: logoutLogic}]
      :
      [{ name: 'LOGIN/SIGN UP!!!', path: '/register' }]
   
   return [...baseRoutes, ...loggedInRoutes];
}