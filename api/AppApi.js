var BASE_URL = 'https://imoneylkh.herokuapp.com/'

function fetchApi(url, method, data){
    console.log(data);
    var path = BASE_URL + url;
    return fetch(path,
    {
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json; charset=utf-8",
        },
        method: method,
        body: JSON.stringify(data)
    }).then(response => response.json());
}

export function loginApi(email, password) {
    var body = {
        email: email,
        password: password
    }
    return fetchApi('user/login', 'POST', body);
}

export function getTransactionTypeApi(expenditureTypeID) {
    var body = {
        expenditureTypeID: expenditureTypeID,
    }
    return fetchApi('transaction/getTransactionType', 'POST', body);
}

export function getExpenditureTypeApi() {
    var body = {
        expenditureTypeID: "",
    }
    return fetchApi('expenditure/getExpenditureType', 'POST', body);
}

export function getCurrencyTypeApi() {
    var body = {
        expenditureTypeID: "",
    }
    return fetchApi('currency/getCurrencyType', 'POST', body);
}

export function getTransactionApi(userID, fromDate, toDate, walletID){
    var body = {
        userID: userID,
        fromDate: fromDate,
        toDate: toDate,
        walletID: walletID
    }
    return fetchApi('transaction/getTransaction', 'POST', body);
}

export function getTransactionOverviewApi(userID, fromDate, toDate, walletID){
    var body = {
        userID: userID,
        fromDate: fromDate,
        toDate: toDate,
        walletID: walletID,
    }
    return fetchApi('transaction/getTransactionOverview', 'POST', body);
}

export function getAllTransactionApi(userID, fromDate, toDate, walletID){
    var body = {
        userID: userID,
        fromDate: fromDate,
        toDate: toDate,
    }
    return fetchApi('transaction/getAllTransaction', 'POST', body);
}

export function getAllTransactionOverviewApi(userID, fromDate, toDate, walletID){
    var body = {
        userID: userID,
        fromDate: fromDate,
        toDate: toDate,
    }
    return fetchApi('transaction/getAllTransactionOverview', 'POST', body);
}

export function getWalletsApi(userID){
    var body = {
        userID: userID,
    }
    return fetchApi('wallet/getWallet', 'POST', body);
}

export function getOverviewApi(userID, fromDate, toDate, walletID){
    var body = {
        userID: userID,
        fromDate: fromDate,
        toDate: toDate,
        walletID: walletID,
    }
    return fetchApi('overview/getOverview', 'POST', body);
}

export function addTransactionApi(transaction){
    var body = {
        amount: transaction.amount,
		transactionTypeID: transaction.transactionTypeID,
		note: transaction.note,
		transactionTime: transaction.transactionTime,
		image: transaction.image,
		userID: transaction.userID,
        walletID: transaction.walletID,
        expenditureTypeID: transaction.expenditureTypeID,
    }
    return fetchApi('transaction/addTransaction', 'POST', body);
}

export function updateTransactionApi(transaction){
    var body = {
        id: transaction.id,
        amount: transaction.amount,
		transactionTypeID: transaction.transactionTypeID,
		note: transaction.note,
		transactionTime: transaction.transactionTime,
		image: transaction.image,
        walletID: transaction.walletID,
        expenditureTypeID: transaction.expenditureTypeID,
        userID: transaction.userID,
    }
    return fetchApi('transaction/updateTransaction', 'POST', body);
}

export function deleteTransactionApi(transaction){
    var body = {
        transactionID: transaction.transactionID,
        amount: transaction.amount,
        walletID: transaction.walletID,
        expenditureTypeID: transaction.expenditureTypeID,
        userID: transaction.userID,
    }
    return fetchApi('transaction/deleteTransaction', 'POST', body);
}

export function addWalletApi(wallet){
    var body = {
       name: wallet.name,
       walletTypeID: wallet.walletTypeID,
       balance: wallet.balance,
       currencyTypeID: wallet.currencyTypeID,
       id: wallet.userID,
    }
    return fetchApi('wallet/addWallet', 'POST', body);
}

export function updateWalletApi(wallet){
    var body = {
        walletID: wallet.walletID,
        name: wallet.name,
        walletTypeID: wallet.walletTypeID,
        balance: wallet.balance,
        currencyTypeID: wallet.currencyTypeID,
    }
    return fetchApi('wallet/updateWallet', 'POST', body);
}

export function deleteWalletApi(walletID){
    var body = {
        walletID: walletID,
    }
    return fetchApi('wallet/deleteWallet', 'POST', body);
}