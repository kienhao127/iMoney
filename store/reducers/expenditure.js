import {SAVE_EXPENDITURE_TYPE } from './../actions/actionType'

const initalState = {
    expenditureType: null,
}

const expenditureTypeReducer = (state = initalState, action) => {
    switch(action.type) {
        case SAVE_EXPENDITURE_TYPE:
            return {
                ...state,
                expenditureType: action.expenditureType
            }
        default:
            return state;
    }
}

export default expenditureTypeReducer;