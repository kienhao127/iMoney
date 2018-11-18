import React, { Component } from 'react';
import { View } from 'react-native';

export default class Tree extends React.Component {
    render() {
        return(
            <View
                style={{
                    marginLeft: 20,
                    width: 20,
                    borderLeftColor: '#DDD',
                    borderLeftWidth: 1,
                    height: this.props.index == 0 ? 15 : 40,
                    borderBottomColor: '#DDD',
                    borderBottomWidth: 1,
            }}
        />
        )
    }
}