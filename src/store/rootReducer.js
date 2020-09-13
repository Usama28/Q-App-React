import { combineReducers } from 'redux'
import AuthReducer from './reducers/authReducer'
import CartReducer from './reducers/cartReducer'
export default combineReducers({
    AuthReducer,
    CartReducer
})
