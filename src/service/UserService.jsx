import HttpService from './HttpService.jsx';
import {CONFIG} from '../util/Config.jsx';

class UserService {
    constructor() {}
    // 登录
    login(params) {
        return HttpService.post(`${CONFIG.apiUrl}/api/v1/login`, params);
    }
}

const User = new UserService();
export default User;
