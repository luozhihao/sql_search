import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux' 
import serverLeft from './count'

export default combineReducers({
    serverLeft,
    routing: routerReducer
})