import { USER_UPDATE_DATA, USER_LOGOUT } from '../constants';

export function userLogin(data) {
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

export function userLogout() {
    return { type: USER_LOGOUT };
};