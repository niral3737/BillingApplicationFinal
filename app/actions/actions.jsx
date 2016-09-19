export var signIn = (token , user) => {
  return {
    type : 'SIGN_IN',
    token,
    user,
    isLoggedIn : true
  };
};

export var signOut = () => {
  return {
    type : 'SIGN_OUT',
    isLoggedIn : false
  };
}
