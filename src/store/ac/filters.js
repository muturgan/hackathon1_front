import { SET_FILTERS } from '../constants';
import { fetchImages } from './index';

export function setFiltesAction(data) {
    return {
        type: SET_FILTERS,
        payload: data,
    };
};

export function setFiltes(data) {
    return (dispatch, getState) => {
        dispatch(setFiltesAction(data));
        dispatch(fetchImages());
    };
};