import HttpService from './HttpService.jsx';
import {CONFIG} from '../util/Config.jsx';

class UserService {
    constructor() {}
    // 登录
    signIn(params) {
        return HttpService.post(`${CONFIG.apiUrl}/account/login.html`, params);
    }

    // 查询列表
    findExhibitionList(params) {
        return HttpService.post(`${CONFIG.apiUrl}/account/findExhibitionList.html`, params);
    }
}

const User = new UserService();
export default User;