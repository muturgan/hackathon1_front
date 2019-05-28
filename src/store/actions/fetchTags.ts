import { newError } from './error';
import { TAGS_FETCH_SUCCESS } from '../constants';
import { BASE_URL } from '../base_url';
import { Dispatch } from 'redux';
import { fetchedTagsType } from '../../custom_types';


export function tagsFetchSuccess(tags: Array<string>) {
    return {
        type: TAGS_FETCH_SUCCESS,
        payload: tags,
    };
}

export function fetchTags() {
    return (dispatch: Dispatch) => {
        fetch(`${BASE_URL}/tags`)
            .then(res => res.json())
            .then((data: fetchedTagsType) => {

                if (data.success !== true) {
                    throw Error((data as any).message);
                }

                dispatch(tagsFetchSuccess(data.tags));
            })
            .catch(err => {
                const message = typeof err === 'string'
                    ? err
                    : '';

                dispatch(newError({
                    code: 'Ошибка загрузки списка тегов',
                    message,
                }));
            });
    };
};