import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import baseReduser from './reducers/baseReduser';


const configureStore = (initialState?: any) => {
    return createStore(
        baseReduser,
        initialState,
        applyMiddleware(thunk)
    );
}

export const store = configureStore();

export type storeState = ReturnType<typeof store.getState>;
