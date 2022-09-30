import { combineReducers } from 'redux';
import alert from './alert';
import user from './user';
import business from './business';
import agent from './agent';
import auth from './auth';

export default combineReducers({
    alert,
    user,
    business,
    agent,
    auth
});
