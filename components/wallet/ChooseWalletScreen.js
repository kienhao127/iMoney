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
import {Container, Content, Icon} from 'native-base';
import Header from '../customcomponents/Header';

import walletLogo from './../../assets/image/wallet-icon.png';
import globalWalletLogo from './../../assets/image/global.png';
import { getWallets } from '../../store/actions/wallet';

class ChooseWalletScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            hasGlobal: this.props.navigation.getParam('hasGlobal'),
            globalWallet: {walletID: -1, name: 'Tổng cộng', balance: 3000, currencyType: '₫'},
            wallets: this.props.navigation.getParam('wallets'),
            selectedWallet: this.props.navigation.getParam('selectedWallet'),
        }
    }

    onBackPress = () => {
        var object = {wallet: this.state.selectedWallet};
        this.props.navigation.state.params.onGoBack(object);
        this.props.navigation.goBack(null);
    }

    onWalletPress = (wallet) => {
        this.setState({
            selectedWallet: wallet,
        })
        var object = {wallet: wallet};
        this.props.navigation.state.params.onGoBack(object);
        this.props.navigation.goBack(null);
    }

    onRightTextPress = () => {
        this.props.navigation.navigate('MyWallets', {wallets: this.state.wallets, onGoBack: () => this.rerender()})
    }

    onAddWalletPress = () => {
        this.props.navigation.navigate('AddWallet', {onGoBack: () => this.rerender()});
    }

    componentDidMount(){
        var totalBalance = 0;
        this.state.wallets.map(wallet => totalBalance += wallet.balance);
        this.setState({
            globalWallet: {walletID: -1, name: 'Tổng cộng', balance: totalBalance, currencyType: '₫'}
        })
    }

    rerender = () => {
        this.props.doGetWallets(this.props.userInfo.id)
        .then((resJson) => {
            this.setState({
                wallets: resJson.wallets,
            })
            var totalBalance = 0;
            resJson.wallets.map(wallet => totalBalance += wallet.balance);
            this.setState({
                globalWallet: {walletID: -1, name: 'Tổng cộng', balance: totalBalance, currencyType: '₫'}
            })
            if (resJson.wallets.filter(wallet => wallet.walletID == this.state.selectedWallet.walletID).length == 0){
                this.setState({
                    selectedWallet: this.state.globalWallet,
                })
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
                    headerTitle='Chọn ví'
                    rightText='Sửa'
                    onRightTextPress={this.onRightTextPress}
                    onLeftPress={this.onBackPress}/>
                <Content>
                    {this.state.hasGlobal ?
                     <Wallet 
                     walletLogo={globalWalletLogo}
                     wallet={this.state.globalWallet} 
                     active={this.state.selectedWallet.name == this.state.globalWallet.name ? true : false} 
                     onWalletPress={() => this.onWalletPress(this.state.globalWallet)}/>
                    : null}

                    <Text style={{fontFamily: 'Roboto-Medium', color:'black', fontSize: 14, padding: 10, }}>Ví của tôi</Text>

                    {this.state.wallets.map((wallet, key) => {
                        return(
                            <Wallet 
                                walletLogo={walletLogo}
                                wallet={wallet} 
                                key={key} 
                                active={this.state.selectedWallet.name == wallet.name ? true : false} 
                                onWalletPress={() => this.onWalletPress(wallet)}/>
                        )
                    })}
                </Content>
                <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this.onAddWalletPress}>
                    <Icon name='add' type='MaterialIcons' style={{color: 'white'}}/>
                </TouchableOpacity>
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
        userInfo: state.user.userInfo,
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        doGetWallets: (userID) => dispatch(getWallets(userID)),
    };
};

// export default ChooseWalletScreen;
export default connect(mapStateToProps, mapDispatchToProps)(ChooseWalletScreen);