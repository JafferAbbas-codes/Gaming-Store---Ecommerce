import {
    GET_KEYBOARD,
    KEYBOARD_LOADING, 
  } from './ActionTypes';
  
  const initialState = {
    // title:null,
    // description:null,
    // category:null,
    // image:null,
    // price:null,
    keyboard: [],
    loading: false
  };
  
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_KEYBOARD:
        return {
          ...state,
          keyboard: action.payload,
          loading: false
        };
      case KEYBOARD_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }