import { Reducer, Action } from 'redux';
import { LOADING_START, LOADING_END } from '../constants';

const reducer: Reducer<boolean, Action<string>> = (loading = false, action) => {
    switch (action.type) {
        case LOADING_START:
            loading = true;
            return loading;

        case LOADING_END:
            loading = false;
            return loading;

        default:
            return loading;
    }
};

export default reducer;