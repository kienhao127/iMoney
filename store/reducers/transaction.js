import {SAVE_TRANSACTION_EXPENSE_TYPE, SAVE_TRANSACTION_INCOME_TYPE} from './../actions/actionType'

const initalState = {
    income: null,
    expense: null,
}

const transactionTypeReducer = (state = initalState, action) => {
    switch(action.type) {
        case SAVE_TRANSACTION_EXPENSE_TYPE:
            return {
                ...state,
                expense: action.expenseTransactionType
            }
        case SAVE_TRANSACTION_INCOME_TYPE:
            return {
                ...state,
                income: action.incomeTransactionType
            }
        default:
            return state;
    }
}

export default transactionTypeReducer;