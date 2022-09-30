import { GET_BUSINESSES, BUSINESSES_ERROR } from "../actions/types";

const initialState = {
    businesses: [],
    business: null,
    loading: true,
    error: {}
};

function businessReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_BUSINESSES:
        return {
            ...state,
            businesses: payload,
            loading: false
        };
    
        default:
        return state;
    }
  }
  
  export default businessReducer;
  