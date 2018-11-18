import { SAVE_CURRENCY_TYPE } from './actionType';

import { getCurrencyTypeApi } from './../../api/AppApi';

export const getCurrencyType = () => {
    return (dispatch) => {
        return getCurrencyTypeApi()
        .then((resJson) => {
            console.log('getCurrencyTypeApi');
            console.log(resJson);
            if (resJson.returnCode == 1){
                dispatch(saveCurrencyType(resJson.currencies));
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export const saveCurrencyType = (items) => {
    return {
        type: SAVE_CURRENCY_TYPE,
        currencyType: items,
    }
}