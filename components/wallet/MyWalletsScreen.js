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
import { getWallets } from '../../store/actions/wallet';

class MyWalletsScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            wallets: this.props.navigation.getParam('wallets'),
        }
        
    }

    onBackPress = () => {
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack(null);
    }

    onWalletPress = (wallet) => {
        console.log(wallet);
        this.props.navigation.navigate('EditWallet', {wallet: wallet, onGoBack: () => this.rerender()});
    }

    onAddTransactionPress = () => {
        this.props.navigation.navigate('AddWallet', {onGoBack: () => this.rerender()});
    }

    rerender = () => {
        this.props.doGetWallets(this.props.userInfo.id)
        .then((resJson) => {
            this.setState({
                wallets: resJson.wallets,
            })
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
                    headerTitle='Ví của tôi'
                    onLeftPress={this.onBackPress}/>
                <Content>  
                    <Text style={{fontFamily: 'Roboto-Medium', color:'black', fontSize: 14, padding: 10, }}>Chọn ví</Text>

                    {this.state.wallets.map((wallet, key) => {
                        return(
                            <Wallet 
                                walletLogo={walletLogo}
                                wallet={wallet} 
                                key={key} 
                                onWalletPress={() => this.onWalletPress(wallet)}/>
                        )
                    })}
                </Content>
                <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this.onAddTransactionPress}>
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
// export default MyWalletsScreen;
export default connect(mapStateToProps, mapDispatchToProps)(MyWalletsScreen);