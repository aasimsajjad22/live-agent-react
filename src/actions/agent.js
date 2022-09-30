import api from '../utils/api';
import { setAlert } from './alert';
import { GET_AGENTS, AGENTS_ERROR } from './types';

// Get users
export const getAgents = () => async (dispatch) => {
    try {
      const res = await api.get('/v1/admin/agents');
  
      dispatch({
        type: GET_AGENTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AGENTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };