import { USER_GET_DATA, USER_LOGOUT } from '../constants'

export function userGetData() {
    return { type: USER_GET_DATA };
};

export function userLogout() {
    return { type: USER_LOGOUT };
};