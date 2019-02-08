// 从types.js 导入 type
import { FETCH_ANIME } from "../action/type";

// 定义初始state
const initialState = {
    items: []
};
// 导出一个方法，接收两个参数，第一个就是初始状态，第二个是action，action是一个对象，包含看type属性
export default function (state = initialState, action) {
    // 判断action的type，导出state，默认导出初始state
    // 如果type是FETCH_ANIME，则将返回初始state和action返回的的payload的数据
    // payload的数据在定义的action里面会调用dispatch返回
    switch (action.type) {
        case FETCH_ANIME:
            return {
                ... state,
                items: action.payload
            };
        default:
            return state;
    }
}
