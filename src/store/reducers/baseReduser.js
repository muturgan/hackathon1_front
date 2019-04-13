import { combineReducers } from 'redux';
import user from './user.js';
import loading from './loading.js';

export default combineReducers({
    user,
    loading,
});