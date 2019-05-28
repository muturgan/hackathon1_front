import { USER_UPDATE_DATA, USER_LOGOUT } from '../constants';
import { fetchImages } from './index';
import { userType, userLoginDataType } from '../../custom_types';
import { storeType } from '../store';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';



export function userLoginAction(data: userLoginDataType) {
    return {
        type: USER_UPDATE_DATA,
        payload: {
            name: data.userData.real_name,
            sex: data.userData.sex,
            email: data.userData.default_email,
            token: data.jwtToken,
            avatar: data.userData.is_avatar_empty ? null : `https://avatars.yandex.net/get-yapic/${data.userData.default_avatar_id}/islands-200`,
        } as userType,
    };
};

export function userLogoutAction() {
    return { type: USER_LOGOUT };
};



export function userLogin(data: userLoginDataType): ThunkAction<void, storeType, {}, AnyAction> {
    return (dispatch, getState) => {
        dispatch(userLoginAction(data));
        dispatch(fetchImages());
    };
};

export function userLogout(): ThunkAction<void, storeType, {}, AnyAction> {
    return (dispatch, getState) => {
        dispatch(userLogoutAction());
        dispatch(fetchImages());
    };
};