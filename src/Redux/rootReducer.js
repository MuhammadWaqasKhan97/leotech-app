import { combineReducers } from 'redux'
import authReducers from './reducer/reducer'
import wishReducer from './reducer/wishReducer'
import productReducer from './reducer/productReducer'
import catgReducer from './reducer/catgReducer'

export default combineReducers({
    authReducers,
    wishReducer,
    productReducer,
    catgReducer
})