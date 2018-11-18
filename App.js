import React, { Component} from 'react';
import LoginScreen from './components/login/LoginScreen';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import RegisterScreen from './components/register/RegisterScreen';
import MainScreen from './components/main/MainScreen';
import NavigationService from './navigation/NavigationService';
import { Root } from "native-base";
import AddTransactionScreen from './components/transaction/AddTransactionScreen';
import EditTransactionScreen from './components/transaction/EditTransactionScreen';
import ViewTransactionScreen from './components/transaction/ViewTransactionScreen';
import TransactionImageScreen from './components/transaction/TransactionImageScreen';
import CalculateTransactionScreen from './components/transaction/CalculateTransactionScreen';
import ChooseWalletScreen from './components/wallet/ChooseWalletScreen';
import MyWalletsScreen from './components/wallet/MyWalletsScreen';
import EditWalletScreen from './components/wallet/EditWalletScreen';
import CategoriesListScreen from './components/category/CategoriesListScreen';
import ChooseRootCategoryScreen from './components/category/ChooseRootCategoryScreen';
import ReportScreen from './components/report/ReportScreen';
import AddWalletScreen from './components/wallet/AddWalletScreen';
import ChooseCurrencyScreen from './components/currency/ChooseCurrencyScreen';
import ReportDetailScreen from './components/report/ReportDetailScreen';

import { connect } from "react-redux";
import { getTransactionIncomeType, getTransactionExpenseType } from './store/actions/transaction';
import { getExpenditureType } from './store/actions/expenditure';
import { login } from './store/actions/user';
import { getCurrencyType } from './store/actions/currency';
import SplashScreen from './components/splash/SplashScreen';

class App extends Component {
  
  componentDidMount(){
    this.props.doGetExpenditureType()
    .catch((err) => {
      console.log(err);
    });
    this.props.doGetTransactionIncomeType()
    .catch((err) => {
      console.log(err);
    });
    this.props.doGetTransactionExpenseType()
    .catch((err) => {
      console.log(err);
    });
    this.props.doGetCurrencyType()
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <Root>
        <RootNavigator 
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          /> 
      </Root>
    );
  }
}

const LoginStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
})

const MainStack = createStackNavigator({
  Splash: SplashScreen,
  Main: MainScreen,
  AddTransaction: AddTransactionScreen,
  EditTransaction: EditTransactionScreen,
  ViewTransaction: ViewTransactionScreen,
  TransactionImage: TransactionImageScreen,
  CalculateTransaction: CalculateTransactionScreen,
  ChooseWallet: ChooseWalletScreen,
  MyWallets: MyWalletsScreen,
  EditWallet: EditWalletScreen,
  CategoriesList: CategoriesListScreen,
  ChooseRootCategory: ChooseRootCategoryScreen,
  Report: ReportScreen,
  AddWallet: AddWalletScreen,
  ChooseCurrency: ChooseCurrencyScreen,
  ReportDetail: ReportDetailScreen,
})

const RootNavigator = createSwitchNavigator(
  {
    Main: MainStack,
    Login: LoginStack,
  }
);

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetTransactionIncomeType: () => dispatch(getTransactionIncomeType()),
    doGetTransactionExpenseType: () => dispatch(getTransactionExpenseType()),
    doGetExpenditureType: () => dispatch(getExpenditureType()),
    doGetCurrencyType: () => dispatch(getCurrencyType()),
  };
};

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);