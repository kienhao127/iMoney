
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
import { deleteWallet, editWallet, updateWallet } from '../../store/actions/wallet';

class EidtWalletScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            wallet: this.props.navigation.getParam('wallet'),
        }
        
    }

    onDeleteWalletPress = (walletID) => {
        console.log(walletID);
        this.props.doDeleteWallet(walletID)
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

    onBackPress = () => {
        this.props.navigation.goBack(null);
    }

    onWalletNameChange = (value) => {
        var wallet = this.state.wallet;
        wallet.name = value;
        this.setState({
            wallet: wallet,
        })
    }

    onRightTextPress = (wallet) => {
        console.log(wallet);
        this.props.doUpdateWallet(wallet)
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

    componentDidMount(){
        console.log(this.state.wallet);
    }

    render() {
        return (
            <Container style={{backgroundColor: '#DDD'}}>
                <Header 
                    iconLeftName='arrow-left' 
                    iconLeftType='Feather'
                    headerTitle='Sửa thông tin ví'
                    rightText='Lưu'
                    onRightTextPress={() => this.onRightTextPress(this.state.wallet)}
                    onLeftPress={this.onBackPress}/>
                <Content>
                    <View style={{flex: 1, }}>
                        <View style={styles.walletInfo}>
                            <Image source={walletLogo} style={styles.walletLogo} resizeMode="contain"/>
                            <Item>
                                <Input style={styles.walletName} value={this.state.wallet.name} onChangeText={this.onWalletNameChange} />
                            </Item> 
                        </View>
                        <TouchableOpacity style={styles.walletInfo}>
                            <View style={styles.currencyType}>
                                <Icon name='dollar' type='FontAwesome' style={{color: 'white'}}/>
                            </View>
                            <Item>
                                <Text style={styles.currencyName}>{this.state.wallet.currencyName}</Text>
                            </Item> 
                        </TouchableOpacity>

                        <TouchableOpacity  style={{backgroundColor: '#DDD', marginTop: 20, }} onPress={() => this.onDeleteWalletPress(this.state.wallet.walletID)}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name='delete' type='MaterialIcons' style={{color: 'gray', marginRight: 10}}/>
                                <Text style={styles.deleteWallet}>XÓA VÍ NÀY</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    walletInfo:{
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
    currencyName:{
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: 'black',
        flex: 1,
        padding: 5,
    },
    currencyType:{
        width: 40,
        height: 40,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#DDD',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteWallet: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: '#D0021B'
    }
});


const mapStateToProps = state => {
  return {
  
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteWallet: (walletID) => dispatch(deleteWallet(walletID)),
    doUpdateWallet: (wallet) => dispatch(updateWallet(wallet)),
  };
};
// export default EidtWalletScreen;
export default connect(mapStateToProps, mapDispatchToProps)(EidtWalletScreen);