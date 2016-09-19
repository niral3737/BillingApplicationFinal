export var authReducer = (state={isLoggedIn : false}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        token : action.token,
        user : action.user,
        isLoggedIn : action.isLoggedIn
      };
    case 'SIGN_OUT' :
      return {
        token : undefined,
        user : undefined,
        isLoggedIn : action.isLoggedIn
      };
    default:
      return state;
  }
};
