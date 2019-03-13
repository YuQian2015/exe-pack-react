import HttpService from './HttpService.jsx';
import {CONFIG} from '../util/Config.jsx';

class PackService {
    constructor() {}
    // 获取租户列表
    getPackList(params) {
        return HttpService.get(`${CONFIG.apiUrl}/api/v1/packs`, params);
    }
}

const Pack = new PackService();
export default Pack;
