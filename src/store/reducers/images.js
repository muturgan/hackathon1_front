import { IMAGES_FETCH_SUCCESS } from '../constants';


export default (images = [], action) => {
    switch (action.type) {
        case IMAGES_FETCH_SUCCESS:
            return action.payload;

        default:
            return images;
    }
};