
import api from '../utils/api';
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
    try {
      const res = await api.get('/v1/user');
  
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  // Login User
export const login = (email, password) => async (dispatch) => {
    const body = { email, password };
  
    try {
      const res = await api.post('/v1/login', body);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
    //   if (errors) {
    //     errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    //   }
  
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };
  