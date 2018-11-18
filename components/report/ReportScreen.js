import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { connect } from "react-redux";
import { Container, Content, Icon, Item, DatePicker } from 'native-base';
import Header from '../customcomponents/Header';
import MoneyText from '../customcomponents/MoneyText';
import ReportChart from './../customcomponents/ReportChart';
import moment from 'moment';
import { getOverview } from '../../store/actions/overview';
import {getTransaction} from './../../store/actions/transaction';
import Utils from '../../utils/Utils';

class ReportScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            rightIcons: [
                {name: 'calendar', type: 'MaterialCommunityIcons'},
            ],
            currentWallet: this.props.navigation.getParam('currentWallet'), 
            transactions: this.props.navigation.getParam('transactions'), 
            overview: this.props.navigation.getParam('overview'), 
            overviewTotal: this.props.navigation.getParam('overviewTotal'),
            headerTitle: this.props.navigation.getParam('headerTitle'),

            expenseTransactions: null,
            incomeTransactions: null,

            fromDate: null,
            toDate: null,
        }
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }


    onBackPress = () => {
        this.props.navigation.goBack(null);
    }

    onIconRightPress = (icon) => {
        console.log(icon);
        if (icon.name == 'calendar'){
            this.setModalVisible(true);
        }
    }

    onModalClose = () => {
     
    }

    setFromDate = (value) => {
        var fd = new Date(value).getTime();
        this.setState({
            fromDate: fd,
        })
    }

    setToDate = (value) => {
        var td = new Date(value).getTime();
        this.setState({
            toDate: td,
        })
        console.log('To date----------------' + td);
    }

    onTimeChosePress = () =>{
        this.setModalVisible(!this.state.modalVisible);
        this.setState({
            headerTitle: moment(this.state.fromDate).format('DD/MM/YYYY') + ' - ' + moment(this.state.toDate).format('DD/MM/YYYY'),
        })
        this.getTransaction(this.props.userInfo.id, this.state.fromDate, this.state.toDate, this.state.currentWallet.walletID);
        this.getOverview(this.props.userInfo.id, this.state.fromDate, this.state.toDate, this.state.currentWallet.walletID);
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
                    this.updateTransaction();
                    }
                } else {
                    this.setState({
                        transactions: null
                    })
                }
            }
        )
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
                    })
                } else {
                    this.setState({
                        overview: null,
                        overviewTotal: 0
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    updateTransaction = () => {
        //Chi tiêu
        var expenseTransactions = this.state.transactions.filter((transaction) => transaction.expenditureTypeID == 0)
        if (expenseTransactions.length > 0){
            //Tìm khoảng chi lớn nhất
            var transactionItems = [];
            expenseTransactions.map(transaction => transactionItems.push(transaction.items));
            var maxExpenseTransaction = transactionItems[0].reduce((prev, current) => (prev.amount > current.amount) ? prev : current);
        
            //tạo data cho chart
            var data = [];
            expenseTransactions.map((transaction) => {
                var dataItem = {label: transaction.category, value: transaction.total, color: Utils.getRandomColor()};
                data.push(dataItem);
            })

            this.setState({
                expenseData: data,
                maxExpenseTransaction: maxExpenseTransaction,
                expenseTransactions: expenseTransactions,
            })
        }
       
        //Thu nhập
        var incomeTransactions = this.state.transactions.filter((transaction) => transaction.expenditureTypeID == 1)
        if (incomeTransactions.length > 0){
            //Tìm khoảng thu lớn nhất
            var transactionItems = [];
            incomeTransactions.map(transaction => transactionItems.push(transaction.items));
            var maxIncomeTransaction = transactionItems[0].reduce((prev, current) => (prev.amount > current.amount) ? prev : current);

            //tạo data cho chart
            var data = [];
            incomeTransactions.map((transaction) => {
                var dataItem = {label: transaction.category, value: transaction.total, color: Utils.getRandomColor()};
                data.push(dataItem);
            })
            this.setState({
                incomeData: data,
                incomeTransactions: incomeTransactions,
                maxIncomeTransaction: maxIncomeTransaction,
            })
        }
    }

    componentDidMount(){
        this.updateTransaction();
    }

    render() {
        return (
        <Container style={{backgroundColor: '#DDD'}}>
            <Header
                iconLeftName='arrow-left' 
                iconLeftType='Feather'
                headerTitle={this.state.headerTitle}
                rightIcons={this.state.rightIcons}
                onLeftPress={this.onBackPress}
                onIconRightPress={this.onIconRightPress} />
            <Content>
                <View style={styles.container}>
                    <View style={styles.item}>
                        <View style={styles.inOutFlow}>
                            <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Medium'}}>Số dư đầu</Text>
                            <MoneyText style={[styles.moneyText, {color:'#000'}]} currencyType='đ' value={this.state.currentWallet.balance - this.state.overviewTotal}/>
                        </View>
                        <View style={styles.inOutFlow}>
                            <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Medium'}}>Số dư cuối</Text>
                            <MoneyText style={[styles.moneyText, {color:'#000'}]} currencyType='đ' value={this.state.currentWallet.balance}/>
                        </View>
                        <View style={[styles.inOutFlow, {marginLeft: 'auto', alignItems: 'center'}]}>
                            <View style={styles.iconInOut}>
                                <Icon name='arrow-down-right' type='Feather' style={{fontSize: 12, color: '#D0021B'}} />
                            </View>
                            <MoneyText style={styles.moneyTextInOut} currencyType='đ' value={this.state.overviewTotal}/>
                        </View>
                    </View>
                    
                    {this.state.overview[0] != undefined && this.state.overview[0].expenditureTypeID == 0?
                    <View style={styles.item}>
                        <View style={styles.inOutFlow}>
                            <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Medium'}}>Thu thập</Text>
                            <MoneyText style={[styles.moneyText, {color:'#008FE5'}]} currencyType='đ' value={0}/>
                        </View>
                        <View style={styles.inOutFlow}>
                            <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Medium'}}>Chi tiêu</Text>
                            <MoneyText style={[styles.moneyText, {color:'#D0021B'}]} currencyType='đ' value={this.state.overview[0].amount}/>
                        </View>
                    </View>
                    :
                    this.state.overview[1] != undefined && this.state.overview[0].expenditureTypeID == 1?
                    <View style={styles.item}>
                        <View style={styles.inOutFlow}>
                            <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Medium'}}>Thu thập</Text>
                            <MoneyText style={[styles.moneyText, {color:'#008FE5'}]} currencyType='đ' value={this.state.overview[0].amount}/>
                        </View>
                        <View style={styles.inOutFlow}>
                            <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Medium'}}>Chi tiêu</Text>
                            <MoneyText style={[styles.moneyText, {color:'#D0021B'}]} currencyType='đ' value={0}/>
                        </View>
                    </View>
                    :
                    <View style={styles.item}>
                        <View style={styles.inOutFlow}>
                            <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Medium'}}>Thu thập</Text>
                            <MoneyText style={[styles.moneyText, {color:'#008FE5'}]} currencyType='đ' value={this.state.overview[0].amount}/>
                        </View>
                        <View style={styles.inOutFlow}>
                            <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Medium'}}>Chi tiêu</Text>
                            <MoneyText style={[styles.moneyText, {color:'#D0021B'}]} currencyType='đ' value={this.state.overview[1].amount}/>
                        </View>
                    </View>
                    }

                    <View style={styles.item}>
                        <View style={styles.inOutFlow}>
                            <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Medium'}}>Thu nhập ròng</Text>
                            <MoneyText style={[styles.moneyText, {color:'#D0021B'}]} currencyType='đ' value={this.state.overviewTotal}/>
                        </View>
                    </View>
                    {this.state.expenseTransactions != null?
                        <View style={styles.item}>
                            <ReportChart data={this.state.expenseData} maxTransaction={this.state.maxExpenseTransaction} transactions={this.state.expenseTransactions} title='Chi tiêu' subTitle='KHOẢNG CHI LỚN NHẤT' chartTitle='CHI TIÊU THEO NHÓM'/>
                        </View>
                    :null}

                    {this.state.incomeTransactions != null?
                        <View style={styles.item}>
                            <ReportChart data={this.state.incomeData} maxTransaction={this.state.maxIncomeTransaction} transactions={this.state.incomeTransactions} title='Thu nhập' subTitle='KHOẢNG THU LỚN NHẤT' chartTitle='THU NHẬP THEO NHÓM'/>
                        </View>
                    :null}
                    
                </View>
            </Content>
            
            <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={this.onModalClose}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Chọn thời gian</Text>
                        <View style={styles.modalItem}>
                            <View style={styles.iconContainer}>
                                <Icon name='calendar' type='MaterialCommunityIcons' style={{fontSize: 25, color: 'gray'}}/>
                            </View>
                            <Item style={{flex: 0.85}}>
                                <DatePicker
                                    minimumDate={new Date(2018, 1, 1)}
                                    maximumDate={new Date(2018, 12, 31)}
                                    timeZoneOffsetInMinutes={undefined}
                                    placeHolderText={'Từ ngày'}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    textStyle={{ color: "black" }}
                                    placeHolderTextStyle={{ color: "gray", padding: 0, margin: 0 }}
                                    onDateChange={this.setFromDate}
                                    />
                            </Item>
                        </View>
                        <View style={styles.modalItem}>
                            <View style={styles.iconContainer}>
                                <Icon name='calendar' type='MaterialCommunityIcons' style={{fontSize: 25, color: 'gray'}}/>
                            </View>
                            <Item style={{flex: 0.85}}>
                                <DatePicker
                                    minimumDate={new Date(2018, 1, 1)}
                                    maximumDate={new Date(2018, 12, 31)}
                                    timeZoneOffsetInMinutes={undefined}
                                    placeHolderText={'Đến ngày'}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    textStyle={{ color: "black" }}
                                    placeHolderTextStyle={{ color: "gray", padding: 0, margin: 0 }}
                                    onDateChange={this.setToDate}
                                    />
                            </Item>
                        </View>
                        <View style={[styles.modalItem, {marginTop: 15, justifyContent: 'flex-end'}]}> 
                            <TouchableOpacity style={styles.modalButotn}
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={styles.modalButtonText}>HỦY</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButotn}
                                onPress={this.onTimeChosePress}>
                                <Text style={styles.modalButtonText}>CHỌN THỜI GIAN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        flexDirection:'column',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    inOutFlow: {
        flexDirection: 'row'
    },
    moneyText:{
        marginLeft: 'auto', 
        paddingRight: 10, 
        fontSize: 16, 
        fontFamily: 'Roboto-Regular'
    },
    iconInOut:{
        width: 16, 
        height: 16, 
        borderRadius: 8, 
        borderWidth: 2, 
        borderColor: '#D0021B',
        marginRight: 10,
    },
    moneyTextInOut:{
        paddingRight: 10, 
        color:'#DDD',
        fontSize: 14,
        fontFamily: 'Roboto-Regular'
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000080'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#FFF',
        padding: 20,
    },
    modalTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        color: '#000',
        marginBottom: 15,
    },
    modalItem: {
        flexDirection: 'row',
    },
    iconContainer:{
        flex: 0.1,
        padding: 10,
        alignItems: 'center',
    },
    modalButtonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: '#008FE5'
    },
    modalButotn: {
        marginLeft: 15
    }
});


const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        doGetTransaction: (userID, fromDate, toDate, walletID) => dispatch(getTransaction(userID, fromDate, toDate, walletID)),
        doGetOverview: (userID, fromDate, toDate, walletID) => dispatch(getOverview(userID, fromDate, toDate, walletID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);