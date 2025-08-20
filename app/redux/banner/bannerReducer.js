import { FETCH_BANNER_SUCCESS } from './bannerTypes';
import localStorage from "@/app/util/localStorage";

var data= JSON.parse(localStorage.getItem('banner')) || [];

const initialState = {
    data
}
const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BANNER_SUCCESS:
            localStorage.setItem('banner',JSON.stringify(action.payload))
            return {
                ...state,
                data: action.payload
            }
        default: return state
    }
};

export default bannerReducer
