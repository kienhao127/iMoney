import { SAVE_EXPENDITURE_TYPE } from './actionType';

import { getExpenditureTypeApi } from './../../api/AppApi';

export const getExpenditureType = () => {
    return (dispatch) => {
        return getExpenditureTypeApi()
        .then((resJson) => {
            console.log('getExpenditureTypeApi');
            console.log(resJson);
            if (resJson.returnCode == 1){
                dispatch(saveExpenditureType(resJson.expenditureType));
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export const saveExpenditureType = (items) => {
    return {
        type: SAVE_EXPENDITURE_TYPE,
        expenditureType: items,
    }
}