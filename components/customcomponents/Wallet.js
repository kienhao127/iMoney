import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import MoneyText from './../customcomponents/MoneyText';

class Wallet extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
    }
    
  }

  render() {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.walletItem} onPress={this.props.onWalletPress}>
            <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: this.props.active ? '#008FE5' : 'transparent'}} />
            <Image source={this.props.walletLogo} style={styles.walletLogo} resizeMode="contain"/>
            <View style={{justifyContent: 'center'}}>
                <Text style={styles.walletName}>{this.props.wallet.name}</Text>
                <MoneyText style={[styles.moneyText, {color:'gray'}]} currencyType='đ' value={this.props.wallet.balance}/>
            </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    walletItem:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 10,
    },
    walletLogo: {
        width: 40, 
        height: 40, 
        margin: 10,
    },
    walletName:{
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: 'black'
    },
    balance:{
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'gray'
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
export default Wallet;
// export default connect(mapStateToProps, mapDispatchToProps)(Wallet);