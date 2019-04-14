import { SET_FILTERS } from '../constants';

const defaultFilters = {
    sortBy: 'id',
    direction: 'asc',
    limit: 20,
    currentPage: 1,
    pages: 1,
    tag: 'all',
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

            return newFilters;

        default:
            return filters;
    }
};

export default reducer;