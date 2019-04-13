import { combineReducers } from 'redux';
import user from './user.js';
import loading from './loading.js';
import filters from './filters.js';
import images from './images.js';

export default combineReducers({
    user,
    loading,
    filters,
    images,
});