import { TAGS_FETCH_SUCCESS } from '../constants';

const reducer = (tags = [], action) => {
    switch (action.type) {
        case TAGS_FETCH_SUCCESS:
            return action.payload;

        default:
            return tags;
    }
};

export default reducer;