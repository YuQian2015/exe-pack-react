// 从redux引入createStore，applyMiddleware，分别用来创建store和使用中间件
import { createStore, applyMiddleware } from 'redux';
// 引入thunk中间件
import thunk from 'redux-thunk';

// 引入根reducer
import rootReducer from '../reducer';

// 创建初始状态
const initialState = {};

// 创建一个中间件的数组
const middleware = [thunk];

// 使用createStore创建store， createStore接收三个参数，createStore(reducer, [preloadedState], [enhancer])
// Arguments
// reducer (Function): A reducing function that returns the next state tree, given the current state tree and an action to handle.
//
//     [preloadedState] (any): The initial state. You may optionally specify it to hydrate the state from the server in universal apps, or to restore a previously serialized user session. If you produced reducer with combineReducers, this must be a plain object with the same shape as the keys passed to it. Otherwise, you are free to pass anything that your reducer can understand.
//
//     [enhancer] (Function): The store enhancer. You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is applyMiddleware().
//
// Returns
// (Store): An object that holds the complete state of your app. The only way to change its state is by dispatching actions. You may also subscribe to the changes to its state to update the UI.
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

// 导出store
export default store;
