import { NEW_ERROR, CLOSE_MODAL } from '../constants';
import { errorForActionType } from '../../custom_types';

export function newError(err: errorForActionType) {
    return {
        type: NEW_ERROR,
        payload: err,
    };
};

export function closeModal() {
    return { type: CLOSE_MODAL };
};