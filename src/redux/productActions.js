
import { GET_ITEMS, ITEMS_LOADING, DELETE_ITEM, ADD_ITEM } from './ActionTypes';
// import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());

  return fetch("http://localhost:3001/products", {
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
    .then(products =>
      dispatch({
        type: GET_ITEMS,
        payload: products
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.message))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

export const deleteItem = (id, token) => (dispatch) => {

  return fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${token}`}
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
    .then(response =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.message))
    );
};

export const addItem = (product) => (dispatch) => {
  return fetch(`http://localhost:3001/products/`, {
        method: "POST",
        body: JSON.stringify(product)
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
    .then(product =>
      dispatch({
        type: ADD_ITEM,
        payload: product
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.message))
    );
};