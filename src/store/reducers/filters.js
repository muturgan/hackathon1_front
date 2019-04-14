import { SET_FILTERS } from '../constants';
// import { fetchImages } from '../ac';
// import { store } from '../store';

const defaultFilters = {
    sortBy: 'id',
    direction: 'asc',
    limit: 20,
    currentPage: 1,
    pages: 1,
};

const reducer = (filters = defaultFilters, action) => {
    switch (action.type) {
        case SET_FILTERS:
            const newFilters = {...filters };
            for (const key in filters) {
                if (key in action.payload && action.payload[key]) {
                    newFilters[key] = Number.isNaN(+String(action.payload[key])) === true ?
                        action.payload[key] :
                        +action.payload[key];

                    if (key === 'pages' && +filters.currentPage > +action.payload.pages) {
                        newFilters.currentPage = +action.payload.pages;
                    }
                }
            }

            // if (
            //     filters.sortBy !== newFilters.sortBy ||
            //     filters.direction !== newFilters.direction ||
            //     filters.limit !== newFilters.limit ||
            //     filters.currentPage !== newFilters.currentPage
            // ) {
            //     store.dispatch(fetchImages(newFilters));
            // }
            return newFilters;

        default:
            return filters;
    }
};

export default reducer;