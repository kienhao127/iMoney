import {SAVE_CURRENCY_TYPE } from './../actions/actionType'

const initalState = {
    currencyType: null,
}

const currencyTypeReducer = (state = initalState, action) => {
    switch(action.type) {
        case SAVE_CURRENCY_TYPE:
            return {
                ...state,
                currencyType: action.currencyType
            }
        default:
            return state;
    }
}

export default currencyTypeReducer;