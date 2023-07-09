import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filterLoadingStatus: 'idle',
    activeFilter: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {
            state.filterLoadingStatus = 'loading';
        },
        filtersFetched: (state, action) => {
            state.filterLoadingStatus = 'idle';
            state.filters = action.payload;
        },
        filtersFetchingError: state => {
            state.filterLoadingStatus = 'error';
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    }
});

const {actions, reducer} = filtersSlice;
export default reducer;
export const {filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged} = actions;
