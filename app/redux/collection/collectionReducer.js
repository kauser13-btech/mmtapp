import { FETCH_COLLECTION_SUCCESS } from './collectionTypes';
import localStorage from "@/app/util/localStorage";

var data= JSON.parse(localStorage.getItem('collection')) || [];

const initialState = {
    data
}
const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COLLECTION_SUCCESS:
            localStorage.setItem('collection',JSON.stringify(action.payload))
            return {
                ...state,
                data: action.payload
            }
        default: return state
    }
};

export default collectionReducer
