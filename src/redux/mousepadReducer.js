import {
    GET_MOUSEPAD,
    MOUSEPAD_LOADING, 
  } from './ActionTypes';
  
  const initialState = {
    // title:null,
    // description:null,
    // category:null,
    // image:null,
    // price:null,
    mousepad: [],
    loading: false
  };
  
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_MOUSEPAD:
        return {
          ...state,
          mousepad: action.payload,
          loading: false
        };
      case MOUSEPAD_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }