import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";

class SettingScreen extends Component {
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
      <View/>
    );
  }
}

const styles = StyleSheet.create({
  
});


const mapStateToProps = state => {
  return {
  
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};
export default SettingScreen;
// export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);