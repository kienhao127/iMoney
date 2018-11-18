import {SAVE_USER_INFO } from './../actions/actionType'

const initalState = {
    userInfo: null,
}

const userReducer = (state = initalState, action) => {
    switch(action.type) {
        case SAVE_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:
            return state;
    }
}

export default userReducer;