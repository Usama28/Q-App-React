import { createStore } from 'redux';
import rootReducer from './rootReducer';

const store = new createStore(rootReducer)

export default store