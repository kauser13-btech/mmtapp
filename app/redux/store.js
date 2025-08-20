import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { fetchtopSneakers } from './topSneakers/topSneakersActions'
import {  fetchData as fetchProductTypesData } from './productTypes/productTypesActions'

const store = createStore(
    rootReducer, applyMiddleware(thunk)
)


store.dispatch(fetchProductTypesData());
store.dispatch(fetchtopSneakers());

export default store