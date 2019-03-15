// 引入action
import { GET_PACKS } from "./type";

import PackService from '../service/PackService.jsx'

export const getPackList = (params) => dispatch => {
    PackService.getPackList(params).then( res => {
        if(res && res.success) {
            dispatch({
                type: GET_PACKS,
                payload: res.data
            })
        }
    }).catch( error => {
        throw error;
    })
};

