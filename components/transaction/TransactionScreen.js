import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import Transaction from './../customcomponents/Transcation';
import Overview from './../customcomponents/Overview';
import { Container, Content} from 'native-base';
import NavigationService from './../../navigation/NavigationService';

class TransactionScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
    }
    
  }

  onReportPress = () => {
    NavigationService.navigate('Report', 
    {
      headerTitle: this.props.headerTitle,
      currentWallet: this.props.currentWallet, 
      transactions: this.props.transactions, 
      overview: this.props.overview, 
      overviewTotal: this.props.overviewTotal
    });
  }

  callback = () => {
    this.props.callback();
  }

  render() {
    return (
        <Container style={{backgroundColor: '#DDD', flex: 1}}>
          {this.props.transactions != null && this.props.overview != null?
            <Content>
                <Overview style={{marginBottom: 30}} overview={this.props.overview} overviewTotal={this.props.overviewTotal} onReportPress={this.onReportPress}/>
                {this.props.transactions.map((transaction, key) => {
                    return (
                        <Transaction callback={this.callback} transaction={transaction} style={{marginBottom: 20}} key={key}/>
                    )
                })}
                <View style={{marginBottom: 75}}/>
            </Content>
            :
            <Text>Không có giao dịch</Text>
            }
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
export default TransactionScreen;
// export default connect(mapStateToProps, mapDispatchToProps)(TransactionScreen);