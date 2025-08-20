import { AUTHENTICATE_USER, LOGOUT_USER } from "./userTypes";

export const storeUserToken = token => {
    return {
        type: AUTHENTICATE_USER,
        payload: token
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}