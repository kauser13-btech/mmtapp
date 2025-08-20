import { FETCH_SUCCESS } from './productTypesTypes';
import localStorage from "@/app/util/localStorage";

const data= JSON.parse(localStorage.getItem('productTypes')) || {};

const initialState = {
    data
}

const productTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            localStorage.setItem('productTypes',JSON.stringify(action.payload))
            return {
                ...state,
                data: action.payload
            }
        default: return state
    }
};

export default productTypesReducer
