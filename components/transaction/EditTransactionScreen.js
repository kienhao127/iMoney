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
import TransactionInfo from './../customcomponents/TransactionInfo';
import { getWallets } from '../../store/actions/wallet';
import { updateTransaction } from '../../store/actions/transaction';

class EditTransactionScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      wallets: null,
      selectedWallet: null,
      transactionItem: this.props.navigation.getParam('transaction'),
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
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  callbackParams = (object) => {
    console.log('callback---------');
    console.log(object);
    var transactionItem = this.state.transactionItem;
    transactionItem.image = object.image;
    transactionItem.logo = object.category.logo,
    transactionItem.amount = object.amount;
    transactionItem.transactionTypeID = object.category.transactionTypeID;
    transactionItem.transactionTypeName = object.category.name;
    transactionItem.note = object.note;
    transactionItem.transactionDate = object.transactionDate != undefined ? object.transactionDate.getTime() : undefined;
    transactionItem.userID = this.props.userInfo.id;
    transactionItem.walletID = object.wallet.walletID;
    transactionItem.walletName =  object.wallet.name;
    transactionItem.balance = object.wallet.balance;
    transactionItem.expenditureTypeID = object.category.expenditureTypeID;

    var transaction = {
      id: this.state.transactionItem.id,
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
      transactionItem: transactionItem,
    })
  }

  onSaveTransaction = (transaction) => {
    console.log(transaction);
    if (transaction.transactionTime != undefined){
      this.props.doUpdateTransaction(transaction)
      .then((resJson) => {
        if (resJson.returnCode == 1){
          this.props.navigation.state.params.onGoBack(this.state.transactionItem);
          this.props.navigation.goBack(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
     
    }
    else{
      this.props.navigation.goBack(null);
    }
  }

  render() {
    return (
        <Container style={{backgroundColor: '#DDD'}}>
        <Header 
            iconLeftName='arrow-left' 
            iconLeftType='Feather'
            headerTitle='Sửa giao dịch'
            rightText='Sửa'
            onRightTextPress={() => this.onSaveTransaction(this.state.transaction)}
            onLeftPress={this.onBackPress}/>
        <Content>
            <TransactionInfo transaction={this.state.transactionItem} wallets={this.state.wallets} selectedWallet={this.state.selectedWallet} callbackParams={this.callbackParams}/>
        </Content>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
    transactionInfo:{
        flexDirection: 'column'
    },
    iconContainer:{
        flex: 0.15
    },
    transactionImage:{
        flexDirection: 'row',
        marginTop: 10,
    }
});


const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetWallets: (userID) => dispatch(getWallets(userID)),
    doUpdateTransaction: (transaction) => dispatch(updateTransaction(transaction)),
  };
};
// export default EditTransactionScreen;
export default connect(mapStateToProps, mapDispatchToProps)(EditTransactionScreen);