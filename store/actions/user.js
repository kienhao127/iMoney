import { SAVE_USER_INFO } from './actionType';

import {loginApi} from './../../api/AppApi';



export const login = (email, password) => {
    return (dispatch) => {
        console.log('loginApi---------');
        return loginApi(email, password)
        .then((resJson) => {
            console.log('loginApi---------');
            console.log(resJson.user[0]);
            if (resJson.returnCode == 1){
                dispatch(saveUserInfo(resJson.user[0]));
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export const saveUserInfo = (items) => {
    return {
        type: SAVE_USER_INFO,
        userInfo: items,
    }
}