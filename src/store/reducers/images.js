import { PUSH_IMAGES } from '../constants';


const reducer = (images = { images: [] }, action) => {
    switch (action.type) {
        case PUSH_IMAGES:
            return { images: [...action.payload.images] };

        default:
            return images;
    }
};

export default reducer;