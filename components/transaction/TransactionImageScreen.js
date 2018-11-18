import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import Header from './../customcomponents/Header';
import { Container, Content} from 'native-base';

class TransactionImageScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            imageURL: this.props.navigation.getParam('imageURL'),
        }
        
    }

    onBackPress = () => {
        this.props.navigation.goBack(null);
    }

    componentDidMount(){
    }

    render() {
        return (
            <Container style={{backgroundColor: 'black', flex: 1}}>
                <Header headerColor='black' iconLeftName='arrow-left' iconLeftType='Feather' onLeftPress={this.onBackPress}/>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Image source={this.state.imageURL} style={{width: '100%', height: '100%'}} resizeMode='contain' />
                </View>
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
export default TransactionImageScreen;
// export default connect(mapStateToProps, mapDispatchToProps)(TransactionImageScreen);