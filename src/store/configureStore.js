import thunk from 'redux-thunk'
import createLogger from 'redux-logger' 
import { createStore, applyMiddleware, compose } from 'redux' 
import DevTools from '../containers/DevTools' // 引入DevTools调试组件

const loggerMiddleware = createLogger()

// 创建一个中间件集合
const middleware = [thunk, loggerMiddleware]

const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument(),
)(createStore)

export default finalCreateStore