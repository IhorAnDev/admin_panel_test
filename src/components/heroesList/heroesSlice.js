import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";


export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:3001/heroes');
    }
)


const heroesAdapter = createEntityAdapter(
);

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
});


const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        createHero: (state, action) => {
            state.heroes.push(action.payload);
        },
        heroDeleteFetch: (state, action) => {
            state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {
            });
    }
});


const {actions, reducer} = heroesSlice;
export default reducer;
export const {
    createHero,
    heroDeleteFetch
} = actions;

export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
    (state) => state.filterReducer.activeFilter,
    selectAll,
    (filter, heroes) => {
        console.log(heroes);
        if (filter === 'all') {
            return heroes;
        } else {
            return heroes.filter(hero => hero.element === filter);
        }
    });
