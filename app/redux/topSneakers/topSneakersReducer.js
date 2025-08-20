import { FETCH_TOPSNEAKERS_SUCCESS } from './topSneakersTypes';
import localStorage from "@/app/util/localStorage";

var topSneakers= JSON.parse(localStorage.getItem('topSneakers')) || {};
const initialState = {
    recently_added: topSneakers.recently_added??[],
    best_sellers: topSneakers.best_sellers??[],
    isLoading: topSneakers.best_sellers?false:true
}

const topSneakersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOPSNEAKERS_SUCCESS:
            localStorage.setItem('topSneakers',JSON.stringify(action.payload))
            return {
                ...state,
                recently_added: action.payload.recently_added,
                best_sellers: action.payload.best_sellers,
                isLoading:false
            }
        default: return state
    }
};

export default topSneakersReducer
