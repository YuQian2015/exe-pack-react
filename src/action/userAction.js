// 引入action
import { USER_LOGIN } from "./type";

import UserService from '../service/UserService.jsx'

export const userLogin = (userId, password) => dispatch => {
    UserService.login({userId, password}).then( res => {
        if(res && res.success) {
            dispatch({
                type: USER_LOGIN,
                payload: res.data
            })
        }
    }).catch( error => {
        throw error;
    })
};

