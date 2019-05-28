import { Reducer } from 'redux';
import { TAGS_FETCH_SUCCESS } from '../constants';
import { myAction } from '../../custom_types';

const reducer: Reducer<Array<string>, myAction<Array<string>>> = (tags = [], action) => {
    switch (action.type) {
        case TAGS_FETCH_SUCCESS:
            return action.payload;

        default:
            return tags;
    }
};

export default reducer;