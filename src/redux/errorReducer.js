import { GET_ERRORS, CLEAR_ERRORS, GET_PASSWORD_ERRORS, GET_EMAIL_ERRORS } from './ActionTypes';

const initialState = {
  msg: null,
  emailerror: null,
  passworderror: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload
      };
    case CLEAR_ERRORS:
      return {
        msg: null
      };
    case GET_EMAIL_ERRORS:
        return {
          emailerror: action.payload
        };
    case GET_PASSWORD_ERRORS:
          return {
            passworderror: action.payload
          };
    default:
      return state;
  }
}