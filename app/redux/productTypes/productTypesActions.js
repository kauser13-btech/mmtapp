import { FETCH_SUCCESS } from './productTypesTypes';
import ApiCall from "@/app/util/ApiCall";

const { performGet } = ApiCall();
// const { setItem } = localStorage();

export const fetchData = () => {
    return (dispatch) => {
        performGet("api/v1/product-types")
            .then(response => {
                dispatch(fetchSuccess(response.data))
            })
            .catch(error => {
            })
    }
}


export const fetchSuccess = data => {
    return {
        type: FETCH_SUCCESS,
        payload: data
    }
}
