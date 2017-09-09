const initialAuthState = { isLoggedIn: false, userID: '', user: {} };

function auth(state = initialAuthState, action) {

  switch (action.type) {

    case 'Login':
      return {
        type: action.type,
        ...state,
        user: action.user,
      }

    case 'LOGIN_SUCCESSFUL':
      return {
        ...state,
        isLoggedIn: true,
        user: action.user
      }
      // return Object.assign({}, state, {
      //   loggedIn: true,
      //   id: 'abc123'
      // });
      break;

    case 'Login_Complete':
      return { ...state, isLoggedIn: true, user: action.user };

    case 'GetUser':
      axios.get('https://crave-scoop.herokuapp.com/get-user/' + action.id).then(response => {
        action.dispatcher.dispatch({type: 'GetUserComplete', user: response.data});
      }).catch(error => {
        action.dispatcher.dispatch({type: 'GetUserFail', id: action.id, error: error });
      });
      return { ...state, isLoggedIn: false };

    case 'GetUserComplete':
      return { ...state, isLoggedIn: true, user: action.user }

    case 'GetUserFail':
      return { ...state, isLoggedIn: false, userID: action.id, error: action.error };

    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

export default auth;
