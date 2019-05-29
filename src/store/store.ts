import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import baseReduser from './reducers/baseReduser';
import { filtersType, userType, errorType, imageType } from '../custom_types';


const configureStore = (initialState?: any) => {
    return createStore(
        baseReduser,
        initialState,
        applyMiddleware(thunk)
    );
}

export const store = configureStore();

const storeState = store.getState();
export type storeState = typeof storeState;
