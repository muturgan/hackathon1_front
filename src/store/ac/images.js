import { IMAGES_FETCH_SUCCESS } from '../constants';
import { loadingStart, loadingEnd, newError, userLogout, setFiltes } from './index';
import { BASE_URL } from '../base_url';

export function imagesFetchSuccess(images) {
    return {
        type: IMAGES_FETCH_SUCCESS,
        payload: images,
    };
}

export function fetchImages(filters, token) {
    return (dispatch) => {
        dispatch(loadingStart());

        const {sortBy, limit, currentPage, direction, tag} = filters;

        fetch(
            `${BASE_URL}/images?sortBy=${sortBy}&limit=${limit}&page=${currentPage}&direction=${direction}&tag=${tag}`,
            {
            headers: token !== null
                ? {authorization: token}
                : {},
            }
        ).then(res => res.json())
        .then(data => {
            if (data.success !== true) {
                if (data.code === 419) {
                    dispatch(userLogout());
                }
    
                dispatch(newError({code: data.code, message: data.message}));
                dispatch(loadingEnd());
                return;
            }

            const newData = data.images.map(image => ({
                id: image.id,
                src: image.path,
                thumbnail: image.path,
                tags: image.tags,
                likes: image.likes,
                likedByYou: image.likedByYou,
                isSelected: !!image.likes,
                caption: image.name,
                thumbnailWidth: 320,
                thumbnailHeight: 320,
            }));
    
            dispatch(imagesFetchSuccess(newData));
    
    
            dispatch(setFiltes({
                pages: data.pages,
            }));
    
            dispatch(loadingEnd());
        })
        .catch(err => {
            const message = typeof err === 'string'
                ? err
                : '';

            dispatch(newError({
                code: 'Ошибка загрузки изображений',
                message,
            }));
        });
    };
};