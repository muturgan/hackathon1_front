import { Reducer } from 'redux';
import { IMAGES_FETCH_SUCCESS } from '../constants';
import { imageType, myAction } from '../../custom_types';
 

const reduser: Reducer<Array<imageType>, myAction<Array<imageType>>> = (images = [], action) => {
    switch (action.type) {
        case IMAGES_FETCH_SUCCESS:
            return action.payload;

        default:
            return images;
    }
};

export default reduser;