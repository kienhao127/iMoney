import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import {Icon} from 'native-base'
import MoneyText from './../customcomponents/MoneyText';

class Overview extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
       overview: [
           {amount: 0, expenditureTypeID: 0},
           {amount: 0, expenditureTypeID: 1},
       ],
       total: 0
    }
    
  }

  componentDidMount(){
      console.log('overview-----------------------');
      console.log(this.props.overview);
  }

  render() {
    return (
        <TouchableOpacity style={[styles.contanier, {...this.props.style}]} activeOpacity={0.8} onPress={this.props.onReportPress}>
            <View style={styles.overview}>
                <View>
                    <Text style={styles.title}>Tổng quan</Text>
                    <Text style={styles.subTitle}>Nhấn vào để xem báo cáo</Text>
                </View>
                <Icon name="chevron-right" type="Entypo" style={{fontSize: 20, marginLeft: 'auto'}}/>
            </View>
            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.5,
                    marginTop: 5,
                    marginBottom: 5,
                }}
                />

            {this.props.overview[0] != undefined && this.props.overview[0].expenditureTypeID == 0?
            <View style={{flex:1}}>
                <View style={styles.inOutFlow}>
                    <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Regular'}}>Tiền vào</Text>
                    <MoneyText style={[styles.moneyText, {color:'#008FE5'}]} currencyType='đ' value={0}/>
                </View>
                <View style={styles.inOutFlow}>
                    <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Regular'}}>Tiền ra</Text>
                    <MoneyText style={[styles.moneyText, {color:'#D0021B'}]} currencyType='đ' value={this.props.overview[0].amount}/>
                </View>
            </View>
            :
            this.props.overview[1] == undefined && this.props.overview[0].expenditureTypeID == 1?
            <View style={{flex:1}}>
                <View style={styles.inOutFlow}>
                    <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Regular'}}>Tiền vào</Text>
                    <MoneyText style={[styles.moneyText, {color:'#008FE5'}]} currencyType='đ' value={this.props.overview[0].amount}/>
                </View>
                <View style={styles.inOutFlow}>
                    <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Regular'}}>Tiền ra</Text>
                    <MoneyText style={[styles.moneyText, {color:'#D0021B'}]} currencyType='đ' value={0}/>
                </View>
            </View>
            :
            <View style={{flex:1}}>
                <View style={styles.inOutFlow}>
                    <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Regular'}}>Tiền vào</Text>
                    <MoneyText style={[styles.moneyText, {color:'#008FE5'}]} currencyType='đ' value={this.props.overview[0].amount}/>
                </View>
                <View style={styles.inOutFlow}>
                    <Text style={{fontSize: 14, color: 'black', fontFamily: 'Roboto-Regular'}}>Tiền ra</Text>
                    <MoneyText style={[styles.moneyText, {color:'#D0021B'}]} currencyType='đ' value={this.props.overview[1].amount}/>
                </View>
            </View>
            }

            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.5,
                    marginTop: 5,
                    marginBottom: 5,
                    width: '50%',
                    marginLeft: 'auto',
                }}
                />
            <MoneyText style={[styles.moneyText, {color:'#000'}]} currencyType='đ' value={this.props.overviewTotal}/>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    contanier: {
        backgroundColor: 'white',
        flexDirection:'column',
        padding: 10,
        borderRadius: 5,
    },
    overview:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    inOutFlow: {
        flexDirection: 'row'
    },
    title:{
        fontFamily: 'Roboto-Medium', 
        fontSize: 20, 
        color: 'black'},
    subTitle:{
        fontFamily: 'Roboto-Regular', 
        fontSize: 12, 
        color: 'gray'
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
export default Overview;
// export default connect(mapStateToProps, mapDispatchToProps)(Overview);