import { GET_AGENTS, AGENTS_ERROR } from "../actions/types";

const initialState = {
    agents: [],
    agent: null,
    loading: true,
    error: {}
};

function agentReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_AGENTS:
        return {
            ...state,
            agents: payload,
            loading: false
        };
    
        default:
        return state;
    }
  }
  
  export default agentReducer;
  