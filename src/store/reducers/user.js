import { USER_GET_DATA, USER_LOGOUT } from '../constants';

const defaultUser = {
    name: 'Аноним',
    sex: 'male',
    email: null,
    token: null,
    avatar: null,
};

const reducer = (userState = defaultUser, action) => {
    switch (action.type) {
        case USER_GET_DATA:
            const newState = {...userState };
            for (const key in userState) {
                if (key in action.payload && action.payload[key]) {
                    newState[key] = action.payload[key];
                }
            }
            return newState;

        case USER_LOGOUT:
            const logoutState = {...userState };
            logoutState.token = null;
            return logoutState;

        default:
            return userState;
    }
};

export default reducer;