import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import { Container, Content, Icon } from 'native-base';
import MoneyText from '../customcomponents/MoneyText';
import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import walletLogo from './../../assets/image/wallet-icon.png';
import moment from 'moment';
import Utils from '../../utils/Utils';
import PureChart from 'react-native-pure-chart';
import NavigationService from './../../navigation/NavigationService';

const screenWidth = Dimensions.get('window').width

class ReportChartDetail extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
           maxTransaction: {transactionTypeName: '', transactionDate: '', amount: 0},
           data: this.props.data
            
        }
    }

    render() {
        return (
            <View style={styles.container}>
               <View style={styles.transactionItem}>
                    <Image source={walletLogo} style={styles.categoryLogo} resizeMode="contain"/>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={[styles.categoryTitle, {fontFamily: 'Roboto-Medium'}]}>{this.props.transaction.category}</Text>
                    </View>
                    <MoneyText style={[styles.moneyText, {color: this.props.title == 'Thu nhập'? '#008FE5' : '#D0021B'}]} currencyType='đ' value={this.props.transaction.total}/>
                </View>

                <View
                    style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 0.5,
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                    />

                {this.props.chartTitle != undefined ?
                <Text style={styles.subTitle}>{this.props.chartTitle}</Text>
                : null}

                <View style={{flex: 1, alignItems: 'center'}}>
                    <PureChart data={this.props.data} type='pie' />
                </View>

                <View
                    style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 0.5,
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                    />
                
                {this.props.transaction.items.map((transaction, key) => {
                    return(
                        <View style={styles.transactionItem} key={key}>
                            <Image source={walletLogo} style={styles.categoryLogo} resizeMode="contain"/>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={styles.categoryTitle}>{transaction.transactionTypeName}</Text>
                            </View>
                            <MoneyText style={[styles.moneyText, {color: this.props.title == 'Thu nhập'? '#008FE5' : '#D0021B'}]} currencyType='đ' value={transaction.amount}/>
                        </View>
                    )
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        color: '#000'
    },
    transactionItem:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryLogo: {
        width: 40, 
        height: 40, 
        margin: 10,
    },
    categoryTitle:{
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: 'black'
    },
    transactionDate:{
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'gray'
    },
    subTitle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        color: 'gray',
        marginTop: 10,
    },
    moneyText:{
        marginLeft: 'auto', 
        paddingRight: 10, 
        fontSize: 16, 
        fontFamily: 'Roboto-Regular'
    },
});


const mapStateToProps = state => {
    return {
    
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};
export default ReportChartDetail;
// export default connect(mapStateToProps, mapDispatchToProps)(ReportChartDetail);