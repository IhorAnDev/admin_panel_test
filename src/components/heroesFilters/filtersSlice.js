import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";


const filtersAdapter = createEntityAdapter(
    {
        selectId: filter => filter.name
    }
);

const initialState = filtersAdapter.getInitialState({
    filterLoadingStatus: 'idle',
    activeFilter: 'all'
});

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:3001/filters');
    })

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, (state) => {
                state.filterLoadingStatus = 'loading';
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filterLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.filterLoadingStatus = 'error';
            })
            .addDefaultCase(() => {
            });
    }
});

const {actions, reducer} = filtersSlice;
export default reducer;
export const {activeFilterChanged} = actions;
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);
