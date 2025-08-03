export const welcomeNavbarLinks = (username = null, id = null, options = null) => {   
   const baseRoutes= [
      { name: 'welcome', path: '/' },
      { name: 'home', path: '/home' },
      { name: 'about', path: '/about' },
      { name: 'contact', path: '/contact' }
   ];
   const loggedInRoutes = (id && username)
      ?
      [
         { name: `${username}'s homepage`, path: `/currentUser/${id}` },
         { name: 'LOGOUT', path: "/", onClick: options.logoutLogic },
         { name: 'challenge videos', path: `/currentUser/${id}/view/challengeVideos/${options.all}` }
      ]
      :
      [{ name: 'LOGIN/SIGN UP!!!', path: '/register' }]
   
   return [...baseRoutes, ...loggedInRoutes];
}