import { IMAGES_FETCH_SUCCESS } from '../constants';
import { loadingStart, loadingEnd, newError, userLogout, setFiltes } from './index';
import { BASE_URL } from '../base_url';
import { imageType, fetchedImagesType } from '../../custom_types';
import { storeState } from '../store';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';


export function voteForImage(index: number): ThunkAction<void, storeState, {}, AnyAction> {
    return async (dispatch, getState) => {
        try {
            const {images, user} = getState();
            const newImages = [...images];

            if (user.token === null) {
                dispatch(newError({
                    code: 'Авторизуйтесь пожалуйста',
                    message: 'Только авторизованые пользователи могут оценивать изображения',
                }));
                return;
            }
        
            const img = newImages[index];
            const endPoint = img.likedByYou ? 'dislike' : 'like';
        
            const data = await fetch(
                `${BASE_URL}/images/${img.id}/${endPoint}`,
                {
                    method: 'PATCH',
                    headers: {authorization: user.token},
                }
            ).then(res => res.json());
        
            if (data.success !== true) {
                if (data.code === 419) {
                    dispatch(userLogout());
                }
            
                dispatch(newError({code: data.code, message: data.message}));
                dispatch(loadingEnd());
                return;
            }
        
            img.likes = endPoint === 'like'
                ? img.likes + 1
                : img.likes - 1;
            img.isSelected = !!img.likes;
            img.likedByYou = !img.likedByYou;
        
            dispatch(imagesFetchSuccess(newImages));

        } catch (err) {}
    };
}



export function imagesFetchSuccess(images: Array<imageType>) {
    return {
        type: IMAGES_FETCH_SUCCESS,
        payload: images,
    };
}



export function fetchImages(): ThunkAction<void, storeState, {}, AnyAction> {
    return (dispatch, getState) => {
        dispatch(loadingStart());

        const {filters, user} = getState();
        const {sortBy, limit, currentPage, direction, tag} = filters;

        fetch(
            `${BASE_URL}/images?sortBy=${sortBy}&limit=${limit}&page=${currentPage}&direction=${direction}&tag=${tag}`,
            {
            headers: user.token !== null
                ? {authorization: user.token}
                : {},
            }
        ).then(res => res.json())
        .then((data: fetchedImagesType) => {
            if (data.success !== true) {
                if (data.code === 419) {
                    dispatch(userLogout());
                }
    
                dispatch(newError({code: data.code, message: (data as any).message}));
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

            if (filters.pages !== data.pages) {
                dispatch(setFiltes({
                    pages: data.pages,
                }));
            }
    
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