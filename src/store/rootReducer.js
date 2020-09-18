import { combineReducers } from 'redux'
import AuthReducer from './reducers/authReducer'
import CartReducer from './reducers/cartReducer'
import companyReducer from './reducers/companyReducer'
export default combineReducers({
    AuthReducer,
    CartReducer,
    companyReducer
})
