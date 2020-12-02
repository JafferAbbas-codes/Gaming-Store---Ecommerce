import {
    GET_ITEMS,
    ITEMS_LOADING, ADD_ITEM, DELETE_ITEM
  } from './ActionTypes';
  
  const initialState = {
    products: [],
    loading: false
  };
  
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_ITEM:
        return {
          ...state,
          products: [action.payload, ...state.products],
          // title:action.payload.title,
          // description:action.payload.description,
          // category:action.payload.description,
          // image:action.payload.image,
          // price:action.payload.price,
          loading: false
        };
      case DELETE_ITEM:
        return {
          ...state,
          products: state.products.filter(product => product.id !== action.payload)
        };
      case GET_ITEMS:
        return {
          ...state,
          products: action.payload,
          loading: false
        };
      case ITEMS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }