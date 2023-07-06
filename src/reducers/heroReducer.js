const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETE_FETCH':
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.payload)

            }
        case 'CREATE_HERO':
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        default:
            return state
    }
}

export default heroReducer;
