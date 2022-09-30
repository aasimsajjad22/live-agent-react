import api from '../utils/api';
import { setAlert } from './alert';
import { GET_USERS, USERS_ERROR, UPDATE_USER, UPDATE_USER_ERROR, GET_USER, USER_ERROR, GET_BUSINESSES_PROFILE, BUSINESSES_PROFILE_ERROR } from './types';

// Get users
export const getUsers = () => async (dispatch) => {
    try {
      const res = await api.get('/v1/admin/users');
  
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: USERS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


// Get users
export const getAgentProfile = (id) => async (dispatch) => {
  try {
    const res = await api.get('/v1/admin/agent/' + id);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Get business profile
export const getBusinessProfile = (id) => async (dispatch) => {
  try {
    const res = await api.get('v1/admin/'+id+'/business');

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


export const updateUser = (user) => async (dispatch) => {
    delete user.email;
    delete user.user_type;
    try {
        const res = await api.patch('/v1/admin/user', user);
    
        dispatch({
          type: UPDATE_USER,
          payload: res.data
        });

      } catch (err) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
  };

