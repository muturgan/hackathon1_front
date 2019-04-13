import { SET_FILTERS } from '../constants';

export function setFiltes(data) {
    return {
        type: SET_FILTERS,
        payload: data,
    };
};