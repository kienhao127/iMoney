import { getOverviewApi } from './../../api/AppApi';

export const getOverview = (userID, fromDate, toDate, walletID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            console.log('getOverview: ' + walletID);
            getOverviewApi(userID, fromDate, toDate, walletID)
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