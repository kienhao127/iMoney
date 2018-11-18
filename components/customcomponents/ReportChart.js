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

class ReportChart extends Component {
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

    createReportDetailData = (transaction) => {
        var data = [];
        transaction.map((transaction) => {
            var dataItem = {label: transaction.transactionTypeName, value: transaction.amount, color: Utils.getRandomColor()};
            data.push(dataItem);
        })
        return data;
    }
    onTransactionPress = (transaction) => {
        console.log('Transaction pass to report detail');
        console.log(transaction);
        var data = this.createReportDetailData(transaction.items);
        console.log(data);
        NavigationService.navigate('ReportDetail', {transaction: transaction, data: data});
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.title != undefined ?
                <View>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <View
                        style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: 0.5,
                            marginTop: 5,
                            marginBottom: 5,
                        }}
                        />
                </View>
                : null}

                {this.props.subTitle != undefined?
                    <Text style={styles.subTitle}>{this.props.subTitle}</Text>
                :null}

                {this.props.maxTransaction != undefined ?
                    <View style={styles.transactionItem}>
                        <Image source={walletLogo} style={styles.categoryLogo} resizeMode="contain"/>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.categoryTitle}>{this.props.maxTransaction.transactionTypeName}</Text>
                            <Text style={styles.transactionDate}>{moment(this.props.maxTransaction.transactionDate).format('DD') + ' tháng ' + moment(this.props.maxTransaction.transactionDate).format('MM YYYY')}</Text>
                        </View>
                        <MoneyText style={[styles.moneyText, {color: this.props.title == 'Thu nhập'? '#008FE5' : '#D0021B'}]} currencyType='đ' value={this.props.maxTransaction.amount}/>
                    </View>
                : null}
                
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
                
                {this.props.transactions.map((transaction, key) => {
                    return(
                        <TouchableOpacity style={styles.transactionItem} key={key} onPress={() => this.onTransactionPress(transaction)}>
                            <Image source={walletLogo} style={styles.categoryLogo} resizeMode="contain"/>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={styles.categoryTitle}>{transaction.category}</Text>
                            </View>
                            <MoneyText style={[styles.moneyText, {color: this.props.title == 'Thu nhập'? '#008FE5' : '#D0021B'}]} currencyType='đ' value={transaction.total}/>
                        </TouchableOpacity>
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
export default ReportChart;
// export default connect(mapStateToProps, mapDispatchToProps)(ReportChart);