import { NEW_ERROR, CLOSE_MODAL } from '../constants';

const defaultError = {
    isModalOpen: false,
    code: null,
    message: null,
};

const reducer = (error = defaultError, action) => {
    switch (action.type) {
        case NEW_ERROR:
            return {
                isModalOpen: true,
                code: action.payload.code,
                message: action.payload.message,
            };

        case CLOSE_MODAL:
            return {
                isModalOpen: false,
                code: error.code,
                message: error.message,
            };

        default:
            return error;
    }
};

export default reducer;