import { FETCH_TOPSNEAKERS_SUCCESS } from './topSneakersTypes';
import ApiCall from "@/app/util/ApiCall";

const { performGet } = ApiCall();
// const { setItem } = localStorage();

export const fetchtopSneakers = () => {
    return (dispatch) => {
        performGet("api/v1/top-sneakers")
            .then(response => {
                dispatch(fetchTopSneakersSuccess(response.data))
            })
            .catch(error => {
            })
    }
}


export const fetchTopSneakersSuccess = topSneakers => {
    return {
        type: FETCH_TOPSNEAKERS_SUCCESS,
        payload: topSneakers
    }
}
