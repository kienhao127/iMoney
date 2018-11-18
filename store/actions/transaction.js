import { SAVE_TRANSACTION_INCOME_TYPE, SAVE_TRANSACTION_EXPENSE_TYPE } from './actionType';

import { getTransactionTypeApi, 
    getTransactionApi, 
    getTransactionOverviewApi, 
    addTransactionApi, 
    updateTransactionApi,
    deleteTransactionApi 
} from './../../api/AppApi';



export const getTransactionExpenseType = () => {
    return (dispatch) => {
        return getTransactionTypeApi(0)
        .then((resJson) => {
            console.log(resJson);
            if (resJson.returnCode == 1){
                dispatch(saveTransactionExpense(resJson.transactionType));
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export const getTransactionIncomeType = () => {
    return (dispatch) => {
        return getTransactionTypeApi(1)
                .then((resJson) => {
                    console.log(resJson);
                    if (resJson.returnCode == 1){
                        dispatch(saveTransactionIncome(resJson.transactionType));
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
    }
}

export const saveTransactionIncome = (items) => {
    return {
        type: SAVE_TRANSACTION_INCOME_TYPE,
        incomeTransactionType: items,
    }
}

export const saveTransactionExpense = (items) => {
    return {
        type: SAVE_TRANSACTION_EXPENSE_TYPE,
        expenseTransactionType: items,
    }
}

export const getTransaction = (userID, fromDate, toDate, walletID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            console.log('getTransactionOverviewApi' + walletID);
            getTransactionOverviewApi(userID, fromDate, toDate, walletID)
            .then((resJson) => {
                var overview = resJson;
                console.log(resJson);
                // resolve(overview);
                getTransactionApi(userID, fromDate, toDate, walletID)
                .then((resJson) => {
                    console.log('getTransactionApi');
                    overview.overview.map(o => o['items'] = resJson.transactions.filter(transaction => transaction.parentID == o.parentID))
                    console.log(overview);
                    resolve(overview);
                })
                .catch((error) => {
                    console.log(error);
                    reject();
                });
            })
            .catch((error) => {
                console.log(error);
                reject();
            });
			
		});
		return promise;
    }
}

export const addTransaction = (transaction) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            console.log('addTransactionApi');
            addTransactionApi(transaction)
            .then((resJson) => {
                console.log(resJson);
                resolve(resJson);
            })
            .catch((error) => {
                console.log(error);
                reject();
            });
			
		});
		return promise;
    }
}

export const updateTransaction = (transaction) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            console.log('updateTransactionwApi');
            updateTransactionApi(transaction)
            .then((resJson) => {
                console.log(resJson);
                resolve(resJson);
            })
            .catch((error) => {
                console.log(error);
                reject();
            });
			
		});
		return promise;
    }
}

export const deleteTransaction = (transaction) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            console.log('deleteTransactionApi');
            deleteTransactionApi(transaction)
            .then((resJson) => {
                console.log(resJson);
                resolve(resJson);
            })
            .catch((error) => {
                console.log(error);
                reject();
            });
			
		});
		return promise;
    }
}