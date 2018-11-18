
import thunk from "redux-thunk";
import {createStore, combineReducers, compose, applyMiddleware } from 'redux';
import transactionTypeReducer from './reducers/transaction';
import expenditureTypeReducer from "./reducers/expenditure";
import userReducer from './reducers/user';
import currencyTypeReducer from "./reducers/currency";

const rootReducer = combineReducers({
  transactionType: transactionTypeReducer,
  expenditureType: expenditureTypeReducer,
  user: userReducer,
  currencyType: currencyTypeReducer,
});


let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore;
