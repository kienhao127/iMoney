import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {Header, Left, Right, Body, Icon } from 'native-base';

export default class HeaderComponent extends React.Component {
  static navigationOptions = {
    header: null
  };

 static get defaultProps() {
    return {
        
    }
  }

  render() {
    return (
        <Header hasTabs={this.props.hasTabs!=undefined ? true : false} noShadow={true} style={{backgroundColor: this.props.headerColor ? this.props.headerColor : '#008FE5', borderBottomColor: this.props.headerColor ? this.props.headerColor : '#008FE5'}}>
            <Left style={{flex: 0.2}}>
                <TouchableOpacity transparent onPress={this.props.onLeftPress}>
                    <Icon name={this.props.iconLeftName} type={this.props.iconLeftType} style={{color: 'white'}} />
                </TouchableOpacity>
            </Left>
            <Body style={{flex: 0.6, alignItems: 'center'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.headerTitle}>{this.props.headerTitle}</Text>
                </View>
            </Body>
            <Right style={{flex: 0.2}}>
                {this.props.rightText!=undefined ?
                <TouchableOpacity transparent onPress={this.props.onRightTextPress}>
                    <Text style={styles.rightText}>{this.props.rightText}</Text>
                </TouchableOpacity>
                : null }

                {this.props.rightIcons != undefined ?
                this.props.rightIcons.map((icon, key) => {
                    return (
                    <TouchableOpacity style={{marginLeft: 20}} transparent key={key} onPress={() => this.props.onIconRightPress(icon)}>
                       <Icon name={icon.name} type={icon.type} style={{color: 'white'}} />
                    </TouchableOpacity>
                    );
                })
                : null }
            </Right>
        </Header>
    );
  }
}

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        color: 'white',
    },
    rightText:{
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: 'white',
    }
});