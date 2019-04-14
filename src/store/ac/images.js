import { FETCH_IMAGES } from '../constants';

export function fetchImages(data) {
    return {
        type: FETCH_IMAGES,
        payload: data,
    };
};