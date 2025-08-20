import { FETCH_COLLECTION_SUCCESS } from './collectionTypes';
import ApiCall from "@/app/util/ApiCall";

const { performGet } = ApiCall();

export const fetchCollectionData = () => {
    return (dispatch) => {
        performGet("api/v1/banner-assets")
            .then(response => {
                dispatch(fetchCollectionSuccess(response.data))
            })
            .catch(error => {
            })
    }
}


export const fetchCollectionSuccess = data => {
    return {
        type: FETCH_COLLECTION_SUCCESS,
        payload: data
    }
}
