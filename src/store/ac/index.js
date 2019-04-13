import { USER_UPDATE_DATA, USER_LOGOUT } from '../constants'

export function userGetData() {
    return { type: USER_UPDATE_DATA };
};

export function userLogout() {
    return { type: USER_LOGOUT };
};