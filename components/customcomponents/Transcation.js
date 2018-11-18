import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import walletLogo from './../../assets/image/wallet-icon.png';
import { connect } from "react-redux";
import Utils from './../../utils/Utils';
import MoneyText from './MoneyText';
import NavigationService from './../../navigation/NavigationService';

class Transaction extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
    }
    
  }

  onTransactionPress = (item) => {
    NavigationService.navigate('ViewTransaction', {transactionItem: item, onGoBack: this.callback});
  }

  callback = () => {
      this.props.callback();
  }


  render() {
    return (
        <View style={[styles.contanier, {...this.props.style}]}>
            <View style={styles.overview}>
                <Image source={{uri: this.props.transaction.logo}} style={styles.categoryLogo} resizeMode="contain"/>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.categoryTitle}>{this.props.transaction.category}</Text>
                    <Text style={styles.transactionCount}>{this.props.transaction.count} giao dịch</Text>
                </View>
                <MoneyText style={[styles.moneyText, {color:'black'}]} currencyType='đ' value={this.props.transaction.expenditureTypeID == 0 ? -this.props.transaction.total : this.props.transaction.total}/>
            </View>
            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.5,
                }}
                />
            <View style={styles.content}>
                {this.props.transaction.items.map((item, key) => {
                    return (
                    <TouchableOpacity style={styles.item} key={key} onPress={() => this.onTransactionPress(item)}>
                        <Text style={styles.date}>{new Date(item.transactionDate).getDate()}</Text>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.transactionDate}>tháng {new Date(item.transactionDate).getMonth() + 1} {new Date(item.transactionDate).getFullYear()}, {Utils.getDayOfWeek(new Date(item.transactionDate).getDay())}</Text>
                            <Text style={styles.note}>{item.note}</Text>
                        </View>
                        <MoneyText style={[styles.moneyText, {color: this.props.transaction.expenditureTypeID == 1 ? '#008FE5' : '#D0021B'}]} currencyType='đ' value={item.amount}/>
                    </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    contanier: {
        backgroundColor: 'white',
        flexDirection:'column',
        padding: 10,
        borderRadius: 5,
    },
    overview:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        flexDirection:'column',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    categoryLogo: {
        width: 40, 
        height: 40, 
        margin: 10,
    },
    categoryTitle:{
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: 'black'
    },
    transactionCount:{
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'gray'
    },
    date:{
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
        color: 'black',
        padding: 5,
    },
    transactionDate:{
        fontFamily: 'Roboto-Regular',
        color: 'black',
    },
    note:{
        fontFamily: 'Roboto-Regular',
        color: 'gray',
    },
    moneyText:{
        marginLeft: 'auto', 
        paddingRight: 10, 
        fontSize: 16, 
        fontFamily: 'Roboto-Regular'
    },

});


const mapStateToProps = state => {
  return {
  
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};
export default Transaction;
// export default connect(mapStateToProps, mapDispatchToProps)(Transaction);