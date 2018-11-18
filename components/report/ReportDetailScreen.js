import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import { Container, Content } from 'native-base';
import ReportChartDetail from './../customcomponents/ReportChartDetail';
import Header from '../customcomponents/Header';

class SplashScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.navigation.getParam('data', null),
            transaction: this.props.navigation.getParam('transaction', null),
        }
        
    }

    onBackPress = () => {
        this.props.navigation.goBack(null);
    }

    componentDidMount(){
        console.log('Report detail screen----------------------');
        console.log(this.state.data);
        console.log(this.state.transaction);
    }

    render() {
        return (
            <Container style={{backgroundColor: '#DDD'}}>
                <Header
                    iconLeftName='arrow-left' 
                    iconLeftType='Feather'
                    headerTitle='Báo cáo chi tiết'
                    onLeftPress={this.onBackPress} />
                <Content>
                    <View style={styles.container}>
                        {this.state.transaction != null?
                            <View style={styles.item}>
                                <ReportChartDetail data={this.state.data} transaction={this.state.transaction} />
                            </View>
                        :null}
                    </View>
                </Content>
            </Container>
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
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);