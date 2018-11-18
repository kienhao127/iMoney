
import { getWalletsApi, addWalletApi, updateWalletApi, deleteWalletApi } from './../../api/AppApi';

export const getWallets = (userID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getWalletsApi(userID)
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


export const addWallet = (wallet) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            console.log('addWalletApi');
            addWalletApi(wallet)
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

export const updateWallet = (wallet) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            console.log('updateWalletApi');
            updateWalletApi(wallet)
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

export const deleteWallet = (walletID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            console.log('deleteWalletApi');
            deleteWalletApi(walletID)
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