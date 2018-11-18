
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { connect } from "react-redux";
import {Container, Content, Input, Item, Icon} from 'native-base';
import Header from '../customcomponents/Header';
import walletLogo from './../../assets/image/wallet-icon.png';
import MoneyText from '../customcomponents/MoneyText';
import { addWallet } from '../../store/actions/wallet';

class AddWalletScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            walletName: '',
            balance: 0,
            currency: {id: -1, name: 'Chọn tiền tệ', symbol: ''},
        }
        
    }

    onBackPress = () => {
        this.props.navigation.goBack(null);
    }

    onRightTextPress = () => {
        var wallet = {
            name: this.state.walletName,
            walletTypeID: 1,
            balance: this.state.balance,
            currencyTypeID: this.state.currency.id,
            userID: this.props.userInfo.id,
        }
        this.props.doAddWallet(wallet)
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

    onWalletNameChange = (value) =>{
        this.setState({
            walletName: value
        })
    }

    onBalancePress = () => {
        this.props.navigation.navigate('CalculateTransaction', {onGoBack: (object) => this.rerender(object)});
    }

    onCurrencyPress = () => {
        this.props.navigation.navigate('ChooseCurrency', {onGoBack: (object) => this.rerender(object)});
    }

    rerender = (object) => {
        var tAmount = this.state.amount;
        var tCurrency = this.state.currency;
        this.setState({
            balance: object.amount ? object.amount : tAmount,
            currency: object.currency ? object.currency : tCurrency,
        })
    }

    render() {
        return (
            <Container style={{backgroundColor: '#DDD'}}>
                <Header 
                    iconLeftName='arrow-left' 
                    iconLeftType='Feather'
                    headerTitle='Thêm ví'
                    rightText='Lưu'
                    onRightTextPress={this.onRightTextPress}
                    onLeftPress={this.onBackPress}/>
                <Content>
                    <View style={styles.container}>
                        <View style={styles.walletInfo}>
                            <Image source={walletLogo} style={styles.walletLogo} resizeMode="contain"/>
                            <Item style={{flex: 0.85, alignItems: 'center'}}>
                                <Input style={styles.walletName} 
                                    value={this.state.walletName}
                                    onChangeText={this.onWalletNameChange} 
                                    placeholder={'Nhập tên ví'}
                                    placeholderTextColor='gray' />
                            </Item> 
                        </View>
                        <View style={styles.walletInfo}>
                            <View style={styles.currencyType}>
                                <Icon name='dollar' type='FontAwesome' style={{color: 'white'}}/>
                            </View>
                            <Item style={{flex: 0.85, alignItems: 'center'}}>
                                <TouchableOpacity style={styles.itemPressable} onPress={this.onCurrencyPress}>
                                    <Text style={[styles.currencyName, {color: this.state.currency.symbol == '' ? 'gray' : '#000'}]}>{this.state.currency.name}</Text>
                                </TouchableOpacity>
                            </Item>
                        </View>
                        <View style={styles.walletInfo}>
                            <View style={[styles.currencyType, {backgroundColor: 'transparent'}]}>
                            
                            </View>
                            <Item style={{flex: 0.85}}>
                                <TouchableOpacity style={styles.itemPressable} onPress={this.onBalancePress}>
                                    {this.state.balance != 0 ?
                                    <MoneyText style={[styles.currencyName, {color:'#000'}]} currencyType={this.state.currency.symbol} value={this.state.balance}/>
                                    :
                                    <Text style={[styles.currencyName, {color: 'gray'}]}>Số dư ban đầu</Text>
                                    }
                                </TouchableOpacity>
                            </Item>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 10,
    },
    walletInfo:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 10,
    },
    walletLogo: {
        width: 30, 
        height: 30, 
        margin: 10,
    },
    walletName:{
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: 'black',
    },
    currencyName:{
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: 'black',
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    currencyType:{
        width: 30,
        height: 30,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#DDD',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemPressable:{
        flex: 1,
        padding: 10,
    },
});


const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doAddWallet: (wallet) => dispatch(addWallet(wallet))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWalletScreen);