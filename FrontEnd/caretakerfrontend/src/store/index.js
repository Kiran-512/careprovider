import { combineReducers, createStore, } from 'redux'
import reducer from './reducer'

const combreducer = combineReducers({
 loggedin: reducer
});

const store = createStore(combreducer)

export default store;