import { combineReducers } from 'redux';
import topSneakersReducer from './topSneakers/topSneakersReducer';
import productTypesReducer from './productTypes/productTypesReducer';
import bannerReducer from './banner/bannerReducer';
// import userReducer from './user/userReducer';

const rootReducer = combineReducers({
    banner: bannerReducer,
    topSneakers: topSneakersReducer,
    productTypes: productTypesReducer,
    // user: userReducer
});


export default rootReducer
