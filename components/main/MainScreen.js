import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Container, Header, Left, Body, Right, Content, Icon, Tabs, Tab, ScrollableTab } from 'native-base';
import walletIcon from './../../assets/image/wallet-icon.png';
import golbalWalletIcon from './../../assets/image/global.png';
import TransactionScreen from './../transaction/TransactionScreen';
import MoneyText from '../customcomponents/MoneyText';
import { connect } from "react-redux";
import Utils from '../../utils/Utils';
import { getWallets } from '../../store/actions/wallet';
import { getOverview } from '../../store/actions/overview';
import {getTransaction} from './../../store/actions/transaction';
import Loader from '../customcomponents/Loader';

class MainScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      wallets: [{walletID: -1, name: 'Tên ví', walletTypeID: 1, balance: 0, currencyTypeID: 1, currencyType: '₫', currencyName: 'loại tiền tệ'}],
      tabs : Utils.getTabsDate(),
      selectedWallet: {walletID: -2, name: 'Tên ví', walletTypeID: 1, balance: 0, currencyTypeID: 1, currencyType: '₫', currencyName: 'loại tiền tệ'},
      selectedTab: 3,
      overview: null,
      overviewTotal: 0,
      transactions: null,
      isLoading: false,
    }
    
  }

  onAddTransactionPress = () => {
    this.props.navigation.navigate('AddTransaction', {onGoBack: (object) => this.rerender(object)});
  }

  onWalletPress = (wallets) => {
    this.props.navigation.navigate('ChooseWallet', {hasGlobal: true, wallets: wallets, selectedWallet: this.state.selectedWallet, onGoBack: (object) => this.rerender(object)});
  }

  rerender = (object) => {
    console.log('Back to main');
    console.log(object);
    var tWallet = object != null ? object.wallet : this.state.selectedWallet;
    this.props.doGetWallets(this.props.userInfo.id)
    .then((resJson) => {
      if (tWallet.walletID != -1){
        tWallet = resJson.wallets.filter(wallet => wallet.walletID == tWallet.walletID)[0];
      }
      console.log('tWallet');
      console.log(tWallet);
      this.setState({
        wallets: resJson.wallets,
        selectedWallet: tWallet != undefined ? tWallet : resJson.wallets[0],
      })
    }) 
    .catch((err) => {
      console.log(err);
    });
    
    this.getTransaction(this.props.userInfo.id, new Date(this.state.selectedTab.fromDate).getTime(), new Date(this.state.selectedTab.toDate).getTime(), tWallet.walletID);
    this.getOverview(this.props.userInfo.id, new Date(this.state.selectedTab.fromDate).getTime(), new Date(this.state.selectedTab.toDate).getTime(), tWallet.walletID); 
  }

  getTransaction = (userID, fromDate, toDate, walletID) => {
    this.props.doGetTransaction(userID, fromDate, toDate, walletID).then((resJson) => {
      console.log('Get Transaciotn ----------');
      console.log(resJson)
      if(resJson.returnCode === 1) {
        if (resJson.overview.length > 0){
          this.setState({
            transactions: resJson.overview,
          })
        }else{
          this.setState({
            transactions: null
          })
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getOverview = (userID, fromDate, toDate, walletID)  => {
    this.props.doGetOverview(userID, fromDate, toDate, walletID).then((resJson) => {
      console.log('Get Overview ----------');
      console.log(resJson)
      if(resJson.returnCode === 1) {
        if(resJson.overview.length > 0){
          var total = 0;
          resJson.overview.map(o => o.expenditureTypeID == 1 ? total += o.amount : total -= o.amount);
          this.setState({
            overview: resJson.overview,
            overviewTotal: total,
            isLoading: false,
          })
        }
        else{
          this.setState({
            overview: null,
            overviewTotal: 0,
            isLoading: false,
          })
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onChangeTab = (index) => {
    var selectedTab = this.state.tabs[index];
    this.setState({
      selectedTab: this.state.tabs[index],
      isLoading: true,
    })
    console.log(selectedTab);
    this.getTransaction(this.props.userInfo.id, new Date(selectedTab.fromDate).getTime(), new Date(selectedTab.toDate).getTime(), this.state.selectedWallet.walletID);  
    this.getOverview(this.props.userInfo.id, new Date(selectedTab.fromDate).getTime(), new Date(selectedTab.toDate).getTime(), this.state.selectedWallet.walletID);  
  }

  componentDidMount(){
    setTimeout(this._tabs.goToPage.bind(this._tabs,3))
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var fromDate = new Date(currentYear, currentMonth, 1);
    var toDate = new Date(currentYear, currentMonth, Utils.daysInMonth(currentMonth, currentYear));
    this.props.doGetWallets(this.props.userInfo.id)
    .then((resJson) => {
      console.log('get wallet--------');
      console.log(resJson);
      this.setState({
        wallets: resJson.wallets,
        selectedWallet: resJson.wallets[0],
      })
      this.onChangeTab(3);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onNotifyPress = () => {
    Alert.alert('Thông báo', 'Tính năng đang phát triển');
  }

  onAccountPress = () => {
    Alert.alert('Thông báo', 'Tính năng đang phát triển');
  }
  
  render() {
    return (
      <Container style={{backgroundColor: '#DDD'}}>
        <Header noShadow={true} hasTabs style={{backgroundColor: '#008FE5', borderBottomColor: '#008FE5'}}>
          <Left style={{flex: 0.2}}>
            <TouchableOpacity transparent onPress={this.onAccountPress}>
              <Icon name='person' type="MaterialIcons" style={{color: 'white'}} />
            </TouchableOpacity>
          </Left>
          <Body style={{flex: 0.6, alignItems: 'center'}}>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.onWalletPress(this.state.wallets)}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={this.state.selectedWallet.walletID == -1 ? golbalWalletIcon : walletIcon} style={{width: 30, height: 30}} resizeMode="contain"/>
                <Icon name='triangle-down' type="Entypo" style={{color: 'white', fontSize: 20}}/>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <Text style={{fontFamily:'roboto-light', fontSize: 12, color: 'white'}}>{this.state.selectedWallet.name}</Text>
                  <MoneyText style={styles.moneyText} currencyType={this.state.selectedWallet.currencyType} value={this.state.selectedWallet.balance}/>
                </View>
              </View>
            </TouchableOpacity>
          </Body>
          <Right style={{flex: 0.2}}>
            <TouchableOpacity transparent onPress={this.onNotifyPress}>
              <Icon name='notifications' type="MaterialIcons" style={{color: 'white'}}/>
            </TouchableOpacity>
          </Right>
        </Header>
        <Tabs ref={component => this._tabs = component} initialPage={this.state.tabs.length-1} tabBarUnderlineStyle={{backgroundColor: "#008FE5"}} renderTabBar={()=> <ScrollableTab/>} onChangeTab={({ i, ref, from })=> this.onChangeTab(i)}>
          {this.state.tabs.map((tab, key) => {
            return (
              <Tab 
                key={key}
                heading={tab.heading} 
                tabStyle={{backgroundColor: '#fff'}}
                textStyle={{color: '#008FE5', fontFamily: 'roboto-light'}} 
                activeTabStyle={{backgroundColor: '#fff'}}
                activeTextStyle={{color: '#008FE5', fontFamily: 'roboto-medium'}}>
                <TransactionScreen headerTitle={tab.heading} callback={this.rerender} currentWallet={this.state.selectedWallet} overview={this.state.overview} overviewTotal={this.state.overviewTotal} transactions={this.state.transactions} key={key} />
              </Tab>
            )})}
        </Tabs>
        <Loader isLoading={this.state.isLoading}/>
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
  moneyText:{
    fontFamily:'roboto-medium', 
    fontSize: 20, 
    color: 'white'
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
    doGetTransaction: (userID, fromDate, toDate, walletID) => dispatch(getTransaction(userID, fromDate, toDate, walletID)),
    doGetOverview: (userID, fromDate, toDate, walletID) => dispatch(getOverview(userID, fromDate, toDate, walletID)),
  };
};
// export default MainScreen;
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);