import { createStore } from 'redux';
import reducer from './reducers/baseReduser.js';

export const store = createStore(reducer);