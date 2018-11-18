import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import { Content, Container } from 'native-base';
import Header from './../customcomponents/Header';
import CategoriesList from './../customcomponents/CategoriesList';
import walletLogo from './../../assets/image/wallet-icon.png';

class ChooseRootCategoryScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            categories: this.props.navigation.getParam('transactionType'),
        }
        
    }
    
    onBackPress = () => {
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <Header 
                    iconLeftName='arrow-left' 
                    iconLeftType='Feather'
                    headerTitle='Chọn nhóm'
                    onLeftPress={this.onBackPress}/>
                <Content>
                    {this.state.categories!=undefined ?
                    <CategoriesList categories={this.state.categories} rootOnly/>
                    : <Text>Không có dữ liệu</Text>}
                </Content>
            </Container>
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
export default ChooseRootCategoryScreen;
// export default connect(mapStateToProps, mapDispatchToProps)(ChooseRootCategoryScreen);