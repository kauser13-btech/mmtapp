import { AUTHENTICATE_USER, LOGOUT_USER } from "./userTypes";

const initState = {
    isAuthenticated: false,
    user: userTokenToData(),
    token: ''
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            window.localStorage.setItem('token', action.payload);
            const user = userTokenToData();
            return {
                ...state,
                isAuthenticated: true,
                user: user,
                token: action.payload
            }
        case LOGOUT_USER:
            window.localStorage.removeItem("token");
            return {
                isAuthenticated: false,
                user: {},
                token: ''
            }
        default:
            return state;
    }
}

function userTokenToData() {
    const token =''
    if (token) {
        const userInfoToken = token.split('.')[1];
        const user = JSON.parse(atob(userInfoToken));
        return {
            name: user.name,
            phone: user.phone,
            image: user.image
        }
    }
    return {}
}

export default userReducer;