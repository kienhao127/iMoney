import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Calculator } from 'react-native-calculator'
import { Container } from 'native-base';
import Header from './../customcomponents/Header';

class CalculatorTransactionScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
        }
    
    }

    onBackPress = () => {
        this.props.navigation.goBack(null);
    }

    onAccept = (value) => {
        var object = {amount: value}
        this.props.navigation.state.params.onGoBack(object);
        this.props.navigation.goBack(null);
    }


    render() {
        return (
        <Container>
            <Header 
                iconLeftName='arrow-left' 
                iconLeftType='Feather'
                headerTitle='Nhập số tiền'
                onLeftPress={this.onBackPress}/>
            <View style={{flex: 1}}>
                <Calculator
                    actionButtonBackgroundColor='gray'
                    numericButtonBackgroundColor='#3d3d3d'
                    borderColor='transparent'
                    onAccept={this.onAccept}
                    fontSize={30}
                    style={{ flex: 1 }} calcButtonBackgroundColor='#008FE5' hasAcceptButton={true} />
            </View>
        </Container>
        )
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
export default CalculatorTransactionScreen;
// export default connect(mapStateToProps, mapDispatchToProps)(CalculatorTransactionScreen);