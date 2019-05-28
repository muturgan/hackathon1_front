import { newError } from './error';
import { TAGS_FETCH_SUCCESS } from '../constants';
import { BASE_URL } from '../base_url';

export function tagsFetchSuccess(tags) {
    return {
        type: TAGS_FETCH_SUCCESS,
        payload: tags,
    };
}

export function fetchTags() {
    return (dispatch) => {
        fetch(`${BASE_URL}/tags`)
            .then(res => res.json())
            .then(data => {

                if (data.success !== true) {
                    throw Error(data.message);
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