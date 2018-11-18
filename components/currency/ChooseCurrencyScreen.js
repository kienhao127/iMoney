import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import Wallet from '../customcomponents/Wallet';
import {Container, Content, Item,} from 'native-base';
import Header from '../customcomponents/Header';

import walletLogo from './../../assets/image/wallet-icon.png';
import globalWalletLogo from './../../assets/image/global.png';

class ChooseCurrencyScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    onBackPress = () => {
        this.props.navigation.goBack(null);
    }

    onCurrencyPress = (currency) => {
        var object = {currency: currency};
        this.props.navigation.state.params.onGoBack(object);
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <Header 
                    iconLeftName='arrow-left' 
                    iconLeftType='Feather'
                    headerTitle='Chọn tiền tệ'
                    onLeftPress={this.onBackPress}/>
                <Content>
                    <View style={{flex: 1}}>
                        {this.props.currencies.map((currency, key) => {
                            return(
                                <Item style={{padding: 10}} key={key}>
                                    <TouchableOpacity style={{flex: 1}} onPress={() => this.onCurrencyPress(currency)}>
                                        <Text style={{marginLeft: 10, color: '#000', fontSize: 15, fontFamily: 'Roboto-Regular'}}>
                                            {currency.name} - {currency.symbol}
                                        </Text>
                                    </TouchableOpacity>
                                </Item>
                            )
                        })}
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    TouchableOpacityStyle:{
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        borderRadius: 50,
        backgroundColor: '#008FE5'
      },
});


const mapStateToProps = state => {
  return {
    currencies: state.currencyType.currencyType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCurrencyScreen);