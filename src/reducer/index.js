// 导入combineReducers，用来合并reducer
import { combineReducers } from 'redux';

// 从各个reducer文件导入reducer
import animeReducer from './animeReducer';
import userReducer from './userReducer';
import tenantReducer from './tenantReducer';
import packReducer from './packReducer';

// 导出reducer 并且为它们都设置一个命名，如：animeReducer命名为anime

export default combineReducers({
    anime: animeReducer,
    user: userReducer,
    tenant: tenantReducer,
    pack: packReducer
});
