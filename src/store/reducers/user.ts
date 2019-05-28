import { Reducer } from 'redux';
import { USER_UPDATE_DATA, USER_LOGOUT } from '../constants';
import { userType, myAction } from '../../custom_types';

const defaultUser: userType = {
    name: 'Аноним',
    sex: 'male',
    email: null,
    token: null,
    avatar: null,
};

const reducer: Reducer<userType, myAction<userType>> = (userState = defaultUser, action) => {
    switch (action.type) {
        case USER_UPDATE_DATA:
            const newState = {...userState };
            for (const key in userState) {
                if (key in action.payload && action.payload[key as keyof userType]) {
                    newState[key as keyof userType] = action.payload[key as keyof userType];
                }
            }
            return newState;

        case USER_LOGOUT:
            return defaultUser;

        default:
            return userState;
    }
};

export default reducer;