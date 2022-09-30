import { GET_USERS, GET_USER, UPDATE_USER } from "../actions/types";

const initialState = {
    users: [],
    user: null,
    loading: true,
    error: {}
};

function userReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_USERS:
        return {
            ...state,
            users: payload,
            loading: false
        };
        case GET_USER:
        return {
            ...state,
            user: payload,
            loading: false
        };
        case UPDATE_USER:
        return {
            ...state,
            users: state.users.map((user) =>
                user.id === payload.id ? { ...payload} : user
            ),
            loading: false
        };
        default:
        return state;
    }
  }
  
  export default userReducer;
  