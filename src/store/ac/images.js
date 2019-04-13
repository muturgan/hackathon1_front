import { PUSH_IMAGES } from '../constants';

export function pushImages(data) {
    return {
        type: PUSH_IMAGES,
        payload: data,
    };
};