import { NEW_ERROR, CLOSE_MODAL } from '../constants';

export function newError(err) {
    return {
        type: NEW_ERROR,
        payload: err,
    };
};

export function closeModal() {
    return { type: CLOSE_MODAL };
};