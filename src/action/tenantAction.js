// 引入action
import { GET_TENANTS } from "./type";

import TenantService from '../service/TenantService.jsx'

export const getTenantList = () => dispatch => {
    TenantService.getTenantList({}).then( res => {
        if(res && res.success) {
            dispatch({
                type: GET_TENANTS,
                payload: res.data
            })
        }
    }).catch( error => {
        throw error;
    })
};

