import { USER_UPDATE_DATA, USER_LOGOUT } from '../constants';
import { fetchImages } from './index';

export function userLoginAction(data) {
    return {
        type: USER_UPDATE_DATA,
        payload: {
            name: data.userData.real_name,
            sex: data.userData.sex,
            email: data.userData.default_email,
            token: data.jwtToken,
            avatar: data.userData.is_avatar_empty ? null : `https://avatars.yandex.net/get-yapic/${data.userData.default_avatar_id}/islands-200`,
        },
    };
};

export function userLogoutAction() {
    return { type: USER_LOGOUT };
};

export function userLogin(data) {
    return (dispatch, getState) => {
        dispatch(userLoginAction(data));
        dispatch(fetchImages());
    };
};

export function userLogout() {
    return (dispatch, getState) => {
        dispatch(userLogoutAction());
        dispatch(fetchImages());
    };
};