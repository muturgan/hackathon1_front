import { combineReducers } from 'redux';
import user from './user';
import loading from './loading';
import filters from './filters';
import images from './images';
import error from './error';
import tags from './tags';

export default combineReducers({
    user,
    loading,
    filters,
    images,
    error,
    tags,
});