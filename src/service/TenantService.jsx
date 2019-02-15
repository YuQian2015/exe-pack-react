import HttpService from './HttpService.jsx';
import {CONFIG} from '../util/Config.jsx';

class TenantService {
    constructor() {}
    // 获取租户列表
    getTenantList(params) {
        return HttpService.get(`${CONFIG.apiUrl}/api/v1/tenants`, params);
    }
}

const User = new TenantService();
export default User;
