import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import { Container, Content, Item } from 'native-base';
import Header from './../customcomponents/Header';
import TransactionInfo from '../customcomponents/TransactionInfo';
import { getWallets } from '../../store/actions/wallet';
import { addTransaction } from '../../store/actions/transaction';

class AddTransactionScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      wallets: null,
      selectedWallet: null,
    }
    
  }

  onBackPress = () => {
    this.props.navigation.goBack(null);
  }

  componentDidMount(){
    this.props.doGetWallets(this.props.userInfo.id)
    .then((resJson) => {
      console.log('get wallet--------');
      console.log(resJson);
      this.setState({
        wallets: resJson.wallets,
        selectedWallet: resJson.wallets[0],
        transaction: null,
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  callbackParams = (object) => {
    console.log('callback---------');
    console.log(object);
    var transaction = {
      amount: object.amount,
      transactionTypeID: object.category.transactionTypeID,
      note: object.note,
      transactionTime: object.transactionDate != undefined ? object.transactionDate.getTime() : undefined,
      image: object.image,
      userID: this.props.userInfo.id,
      walletID: object.wallet.walletID,
      expenditureTypeID: object.category.expenditureTypeID,
    }
    console.log(transaction);
    this.setState({
      transaction: transaction,
      selectedWallet: object.wallet,
    })
  }

  onSaveTransaction = (transaction) => {
    this.props.doAddTransaction(transaction)
    .then((resJson) => {
      if (resJson.returnCode == 1){
        this.props.navigation.state.params.onGoBack(null);
        this.props.navigation.goBack(null);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
        <Container style={{backgroundColor: '#DDD'}}>
            <Header 
                iconLeftName='arrow-left' 
                iconLeftType='Feather'
                headerTitle='Thêm giao dịch'
                rightText='Lưu'
                onLeftPress={this.onBackPress}
                onRightTextPress={() => this.onSaveTransaction(this.state.transaction)}/>
            <Content>
                <TransactionInfo wallets={this.state.wallets} selectedWallet={this.state.selectedWallet} callbackParams={this.callbackParams}/>
            </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({

});


const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetWallets: (userID) => dispatch(getWallets(userID)),
    doAddTransaction: (transaction) => dispatch(addTransaction(transaction)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionScreen);