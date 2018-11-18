import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import { login } from './../../store/actions/user';
import { getWallets } from '../../store/actions/wallet';


class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
    }
    
  }

  componentDidMount(){
    this.props.doLogin('admin', '123123')
    .then((resJson) => {
      console.log('do login-----------');
      console.log(this.props.userInfo);
      setTimeout(() => {
        this.props.navigation.navigate('Main');
      }, 1500); 
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <View style={{backgroundColor: '#008FE5', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('./../../assets/image/logo.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});


const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doLogin: (email, password) => dispatch(login(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);