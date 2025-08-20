import { FETCH_BANNER_SUCCESS } from './bannerTypes';
import ApiCall from "@/app/util/ApiCall";

const { performGet } = ApiCall();

export const fetchBannerData = () => {
    return (dispatch) => {
        performGet("api/v1/banner-assets")
            .then(response => {
                dispatch(fetchBannerSuccess(response.data))
            })
            .catch(error => {
            })
    }
}


export const fetchBannerSuccess = data => {
    return {
        type: FETCH_BANNER_SUCCESS,
        payload: data
    }
}
