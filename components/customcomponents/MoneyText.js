import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import Numeral from 'numeral';

export default class MoneyText extends Component {

    render() {
        return (
        <Text {...this.props}>
            <Text>{Numeral(this.props.value).format(0,0)}</Text>
            <Text> {this.props.currencyType}</Text>
        </Text>
        )
    }
}