import api from '../utils/api';
import { setAlert } from './alert';
import { GET_BUSINESSES, BUSINESSES_ERROR } from './types';

// Get users
export const getBusinesses = () => async (dispatch) => {
    try {
      const res = await api.get('/v1/admin/business');
  
      dispatch({
        type: GET_BUSINESSES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BUSINESSES_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };