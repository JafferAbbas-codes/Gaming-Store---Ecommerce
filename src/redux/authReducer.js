import { SIGNIN_USER, SIGNUP_USER, CLEAR_USER } from './ActionTypes';
  
  const initialState = {
    user: null,
    isloggedIn: false,
    token: null,
    error: null,
    role: false
  };
  
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SIGNUP_USER:
        return {
          ...state,
          user: action.payload.result.userExist,
          token: action.payload.result.token,
          isloggedIn: true,
          error: null,
          role: false
        };
      case SIGNIN_USER:
        return {
          ...state,
          user: action.payload.result.userExist,
          role: action.payload.result.isAdmin,
          token: action.payload.result.token,
          isloggedIn: true
        };
    case CLEAR_USER:
        return {
          ...state,
          role: false,
          user: null,
          isloggedIn: false,
          token: null
        };
      default:
        return state;
    }
  }