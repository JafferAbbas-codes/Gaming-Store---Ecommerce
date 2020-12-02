import {
    GET_MOUSE,
    MOUSE_LOADING, 
  } from './ActionTypes';
  
  const initialState = {
    // title:null,
    // description:null,
    // category:null,
    // image:null,
    // price:null,
    mouse: [],
    loading: false
  };
  
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_MOUSE:
        return {
          ...state,
          mouse: action.payload,
          loading: false
        };
      case MOUSE_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }