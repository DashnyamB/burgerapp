const initialState = {
  saving: false,
  firebaseError: null,
  loggingIn: false,
  token: null,
  iserID: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_USER_START": {
      return {
        ...state,
        saving: true,
      };
    }
    case "SIGNUP_USER_SUCCESS": {
      return {
        ...state,
        saving: false,
        firebaseError: null,
        token: action.token,
        userId: action.userId,
      };
    }
    case "SIGNUP_USER_ERROR": {
      return {
        ...state,
        saving: false,
        firebaseError: action.error.response.data.error,
      };
    }
    case "LOGIN_USER_START": {
      return {
        ...state,
        loggingIn: true,
      };
    }
    case "LOGIN_USER_ERROR": {
      return {
        ...state,
        loggingIn: false,
        firebaseError: action.error.response.data.error,
      };
    }
    case "LOGIN_USER_SUCCESS": {
      return {
        ...state,
        loggingIn: false,
        token: action.token,
        userId: action.userId,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        token: null,
        userId: null,
        firebaseError: null,
      };
    }
    default:
      return state;
  }
};

export default reducer;
