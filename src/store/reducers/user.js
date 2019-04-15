import { USER_UPDATE_DATA, USER_LOGOUT } from '../constants';

const defaultUser = {
    name: 'Аноним',
    sex: 'male',
    email: null,
    token: null,
    avatar: null,
};

const reducer = (userState = defaultUser, action) => {
    switch (action.type) {
        case USER_UPDATE_DATA:
            const newState = {...userState };
            for (const key in userState) {
                if (key in action.payload && action.payload[key]) {
                    newState[key] = action.payload[key];
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