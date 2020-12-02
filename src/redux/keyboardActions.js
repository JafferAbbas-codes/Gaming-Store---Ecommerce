
import { GET_KEYBOARD, KEYBOARD_LOADING } from './ActionTypes';
// import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getKeyboard = () => (dispatch) => {
  dispatch(setKeyboardLoading());

  const id = "5f0d7e62bc0b571d609cf21f";

  return fetch(`http://localhost:3001/products/category/${id}`, {
        method: "GET"
    })
    .then(response => {
      if(response.ok) {
          return response;
      }
      else {
          var error = new Error('Error '  + response.status + ": " + response.statusText)
          error.response = response;
          throw error;
      }
  }, 
  error => {
      var errmess = new Error(error.message);
      throw errmess;
  })
  .then(response => response.json())
    .then(products => {
      dispatch({
        type: GET_KEYBOARD, 
        payload: products
      }) }
    )
    .catch(err =>
      dispatch(returnErrors(err.message))
    );
};

export const setKeyboardLoading = () => {
  return {
    type: KEYBOARD_LOADING
  };
};
