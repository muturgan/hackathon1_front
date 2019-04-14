import { PUSH_IMAGES } from '../constants';


export default async(images = [], action) => {
    switch (action.type) {
        case PUSH_IMAGES:
            return action.payload;

        default:
            return images;
    }
};