import { FETCH_IMAGES } from '../constants';
import { setFiltes, loadingStart, loadingEnd, newError, userLogout } from '../ac';
import { store } from '../store';

const moch = [{
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 320,
    caption: "After Rain (Jeshu John - designerspics.com)"
}];


const reducer = async(images = { images: moch }, action) => {
    switch (action.type) {
        case FETCH_IMAGES:
            store.dispatch(loadingStart());

            const { sortBy, limit, currentPage, direction } = action.payload;

            const data = await fetch(
                `https://tula-hackathon-2019-sakharov.cf/api/v1/images?sortBy=${sortBy}&limit=${limit}&page=${currentPage}&direction=${direction}`, {
                    headers: store.user.token !== null ? { authorization: this.props.token } : {},
                }
            ).then(res => res.json());

            if (data.success === false) {
                if (data.code === 419) {
                    this.props.dispatch(userLogout());
                }

                this.props.dispatch(newError({ code: data.code, message: data.message }));
                this.props.dispatch(loadingEnd());
                return images;
            }

            this.props.dispatch(setFiltes({
                pages: data.pages,
            }));

            this.props.dispatch(loadingEnd());

            return data.images.map(image => ({
                src: image.path,
                thumbnail: image.path,
                tags: image.tags,
                caption: image.name,
                thumbnailWidth: 320,
                thumbnailHeight: 320,
            }));

        default:
            return images;
    }
};

export default reducer;