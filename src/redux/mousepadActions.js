
import { GET_MOUSEPAD, MOUSEPAD_LOADING } from './ActionTypes';
// import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getMousepad = () => (dispatch) => {
  dispatch(setMousepadLoading());

//   const id = //Enter mousepad category here; 
const id = "5f0d7e54bc0b571d609cf21e"; //mouse id

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
      console.log("Helllo" + products)
      dispatch({
        type: GET_MOUSEPAD, 
        payload: products
      }) }
    )
    .catch(err =>
      dispatch(returnErrors(err.message))
    );
};

export const setMousepadLoading = () => {
  return {
    type: MOUSEPAD_LOADING
  };
};
