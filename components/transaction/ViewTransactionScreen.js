import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import { Container, Content, Icon } from 'native-base';
import Header from './../customcomponents/Header';
import walletIcon from './../../assets/image/wallet-icon.png';
import NavigationService from './../../navigation/NavigationService';
import MoneyText from '../customcomponents/MoneyText';
import moment from 'moment';
import { deleteTransaction } from '../../store/actions/transaction';
import transactionImage from './../../assets/image/transaction.png';

class ViewTransactionScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
        rightIcons: [
            {name: 'edit', type: 'MaterialIcons'},
            {name: 'delete', type: 'MaterialIcons'}
        ],
        imageURL: transactionImage,
        transaction: this.props.navigation.getParam('transactionItem'),
    }
    
  }

  onImagePress = (imageURL) => {
    NavigationService.navigate('TransactionImage', {imageURL: imageURL});
  }

  onBackPress = () => {
    this.props.navigation.state.params.onGoBack();
    this.props.navigation.goBack(null);
  }

  onIconRightPress = (icon) => {
      console.log(icon);
    if (icon.name == 'edit'){
        this.props.navigation.navigate('EditTransaction', {transaction: this.state.transaction, onGoBack: (object) => this.rerender(object)});
    }
    if (icon.name == 'delete'){
        var transaction = {
            transactionID: this.state.transaction.id,
            amount: this.state.transaction.amount,
            walletID: this.state.transaction.walletID,
            expenditureTypeID: this.state.transaction.expenditureTypeID,
            userID: this.props.userInfo.id,
        }
        console.log(transaction);
        this.props.doDeleteTransaction(transaction)
        .then((resJson) => {
            if (resJson.returnCode == 1){
                this.props.navigation.state.params.onGoBack();
                this.props.navigation.goBack(null);
            }
        }) 
        .catch((err) => {
            console.log(err);
        });
    }
  }

  componentDidMount(){
    console.log(this.state.transaction);
  }

  rerender = (object) => {
    
    this.setState({
        transaction: object,
    })
}

  render() {
    return (
        <Container style={{backgroundColor: '#DDD'}}>
            <Header 
                iconLeftName='arrow-left' 
                iconLeftType='Feather'
                headerTitle='Chi tiết giao dịch'
                rightIcons={this.state.rightIcons}
                onLeftPress={this.onBackPress}
                onIconRightPress={this.onIconRightPress}/>
            <Content>
                <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.onImagePress(this.state.imageURL)}>
                    <Image  
                        style={{height: 200}}
                        resizeMode='cover'
                        source={transactionImage}/>
                </TouchableOpacity>
                
                    <View style={styles.transactionInfo}>
                        <View style={styles.item}>
                            <View style={styles.iconContainer}>
                                
                            </View>
                            <View style={{flex: 0.85}}>
                                <View style={styles.itemPressable}>
                                    <MoneyText style={[styles.amount, {color: this.state.transaction.expenditureTypeID == 1 ? '#008FE5' : '#D0021B'}]} currencyType={this.state.transaction.symbol} value={this.state.transaction.amount}/>
                                </View>
                            </View>
                        </View>
                    
                        <View style={styles.item}>
                            <View style={styles.iconContainer}>
                                <Image source={{uri: this.state.transaction.logo}} style={{width: 30, height: 30}} resizeMode="contain"/>
                            </View>
                            <View style={{flex: 0.85}}>
                                <View style={styles.itemPressable}>
                                    <Text style={styles.category}>{this.state.transaction.transactionTypeName}</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={styles.item}>
                            <View style={styles.iconContainer}>
                                <Icon name='note-outline' type='MaterialCommunityIcons' style={{fontSize: 25, color: 'gray'}}/>
                            </View>
                            <View style={{flex: 0.85}}>
                                <View style={styles.itemPressable}>
                                    <Text style={styles.note}>{this.state.transaction.note != null ? this.state.transaction.note : ''}</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={styles.item}>
                            <View style={styles.iconContainer}>
                                <Icon name='calendar' type='MaterialCommunityIcons' style={{fontSize: 25, color: 'gray'}}/>
                            </View>
                            <View style={{flex: 0.85}}>
                                <View style={styles.itemPressable}>
                                    <Text style={styles.transactionDate}>{moment(new Date(this.state.transaction.transactionDate)).format('DD/MM/YYYY')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View style={styles.iconContainer}>
                                <Icon name='wallet' type='MaterialCommunityIcons' style={{fontSize: 25, color: 'gray'}}/>
                            </View>
                            <View style={{flex: 0.85}}>
                                <View style={styles.itemPressable}>
                                    <Text style={styles.wallet}>{this.state.transaction.walletName}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Content>
        </Container>
    );
  }
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column'
    },
    transactionImageContainer:{
        
    },
    transactionInfo:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    iconContainer:{
        flex: 0.1,
        padding: 10,
        alignItems: 'center',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    itemPressable:{
        flex: 1,
        padding: 10,
    },
    amount: {
        fontFamily: 'Roboto-Medium',
        fontSize: 25,
    },
    category: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#000'
    },
    note:{
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#000'
    },
    transactionDate: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#000'
    },
    wallet: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#000'
    },
    transactionImage:{
        flexDirection: 'row',
        marginTop: 10,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 5,
    },
});


const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteTransaction: (transaction) => dispatch(deleteTransaction(transaction)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTransactionScreen);