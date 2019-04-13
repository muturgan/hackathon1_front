import { LOADING_START, LOADING_END } from '../constants';

export function loadingStart() {
    return { type: LOADING_START };
};

export function loadingEnd() {
    return { type: LOADING_END };
};