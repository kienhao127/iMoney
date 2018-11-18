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
import {Container, Tabs, Tab} from 'native-base';
import Header from '../customcomponents/Header';

import walletLogo from './../../assets/image/wallet-icon.png';
import CategoriesList from '../customcomponents/CategoriesList';


class CategoriesListScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            categories: this.props.expenseTransactionType,
        }
        
    }

    onBackPress = () => {
        this.props.navigation.goBack(null);
    }

    onChangeTab = (index) => {
        if (index == 0){
            this.setState({
                categories: this.props.expenseTransactionType,
            })
        }
        if (index == 1){
            this.setState({
                categories: this.props.incomeTransactionType,
            })
        }
        
    }

    componentDidMount() {
        
    }

    onCategoryPress = (category) => {
        console.log('Add transaction category--------');
        console.log(category);
        var object = {category: {transactionTypeID: category.id, name: category.name, logo: category.logo, expenditureTypeID: category.expenditureTypeID}}
        this.props.navigation.state.params.onGoBack(object);
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <Header 
                    iconLeftName='arrow-left' 
                    iconLeftType='Feather'
                    headerTitle='Chọn nhóm'
                    onLeftPress={this.onBackPress}
                    hasTabs/>
                <Tabs tabBarUnderlineStyle={{backgroundColor: "#008FE5"}}  onChangeTab={({ i, ref, from })=> this.onChangeTab(i)}>
                    {this.props.expenditureType.map((tab, key) => {
                    return (
                        <Tab 
                        key={key}
                        heading={tab.name} 
                        tabStyle={{backgroundColor: '#fff'}}
                        textStyle={{color: '#008FE5', fontFamily: 'roboto-light'}} 
                        activeTabStyle={{backgroundColor: '#fff'}}
                        activeTextStyle={{color: '#008FE5', fontFamily: 'roboto-medium'}}>
                        {this.state.categories != null ?
                        <CategoriesList categories={this.state.categories} onCategoryPress={this.onCategoryPress}/>
                        : <Text>Không có dữ liệu</Text>}
                        </Tab>
                    )})}
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    
});


const mapStateToProps = state => {
  return {
    incomeTransactionType: state.transactionType.income,
    expenseTransactionType: state.transactionType.expense,
    expenditureType: state.expenditureType.expenditureType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};
// export default CategoriesListScreen;
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListScreen);