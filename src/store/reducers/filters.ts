import { Reducer } from 'redux';
import { SET_FILTERS } from '../constants';
import { filtersType, filtersForActionType, myAction } from '../../custom_types';

const defaultFilters: filtersType = {
    sortBy: 'id',
    direction: 'asc',
    limit: 20,
    currentPage: 1,
    pages: 1,
    tag: 'all',
};

const reducer: Reducer<filtersType, myAction<filtersForActionType>> = (filters = defaultFilters, action) => {
    switch (action.type) {
        case SET_FILTERS:
            const newFilters = {...filters };
            for (const key in filters) {
                if (key in action.payload && action.payload[key as keyof filtersType]) {
                    newFilters[key as keyof filtersType] = Number.isNaN(+String(action.payload[key as keyof filtersType])) === true
                        ? action.payload[key as keyof filtersType] as string
                        : +(action.payload[key as keyof filtersType] as string);

                    if (key === 'pages' && +filters.currentPage > +(action.payload.pages as number)) {
                        newFilters.currentPage = +(action.payload.pages as number);
                    }
                }
            }

            return newFilters;

        default:
            return filters;
    }
};

export default reducer;