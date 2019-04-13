import { SET_FILTERS } from '../constants';

const defaultFilters = {
    sortBy: 'id',
    direction: 'asc',
    limit: 20,
    offset: 0,
};

const reducer = (filters = defaultFilters, action) => {
    switch (action.type) {
        case SET_FILTERS:
            const newFilters = {...filters };
            for (const key in filters) {
                if (key in action.payload && action.payload[key]) {
                    newFilters[key] = action.payload[key];
                }
            }
            return newFilters;

        default:
            return filters;
    }
};

export default reducer;