import { SET_FILTERS } from '../constants';
import { fetchImages } from './index';
import { filtersForActionType } from '../../custom_types';
import { storeState } from '../store';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export function setFiltesAction(data: filtersForActionType) {
    return {
        type: SET_FILTERS,
        payload: data,
    };
};

export function setFiltes(data: filtersForActionType): ThunkAction<void, storeState, {}, AnyAction> {
    return (dispatch, getState) => {
        dispatch(setFiltesAction(data));
        dispatch(fetchImages());
    };
};