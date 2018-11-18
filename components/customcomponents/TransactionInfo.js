import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { Item , Icon, DatePicker} from 'native-base';
import NavigationService from './../../navigation/NavigationService';
import ImagePicker from 'react-native-image-crop-picker';
import MoneyText from './MoneyText';
import { getWallets } from '../../store/actions/wallet';
import { connect } from "react-redux";
import transactionImage from './../../assets/image/transaction.png';
var Buffer = require('buffer/').Buffer;

class TransactionInfo extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            imageURL: transactionImage,
            amount: this.props.transaction ? this.props.transaction.amount : 0,
            category: this.props.transaction ? {transactionTypeID: this.props.transaction.transactionTypeID, name: this.props.transaction.transactionTypeName, logo: this.props.transaction.logo, expenditureTypeID: this.props.transaction.expenditureTypeID} : {transactionTypeID: -1, name: 'Chọn nhóm', logo: "https://conversion-hub.com/wp-content/uploads/2017/03/question-mark-on-a-circular-black-background.png", expenditureTypeID: -1},
            note: this.props.transaction ? this.props.transaction.note : '',
            transactionDate: this.props.transaction ? new Date(this.props.transaction.transactionDate) : new Date(),
            wallet: this.props.transaction ? {walletID: this.props.transaction.walletID, name: this.props.transaction.walletName, balance: this.props.transaction.balance} : {walletID: -1, name: 'Chọn ví', balance: -1},
        }
        
    }

    callback = (object) => {
        var object = {
            amount: object.amount != undefined ? object.amount : this.state.amount,
            category: object.category != undefined ? object.category : this.state.category,
            note: object.note  != undefined? object.note : this.state.note,
            transactionDate: object.transactionDate != undefined ? object.transactionDate : this.state.transactionDate,
            wallet: object.wallet != undefined ? object.wallet : this.state.wallet,
            image: object.image != undefined ? object.image : this.state.imageURL,
        }
        this.props.callbackParams(object);
    }

    setDate = (newDate) => {
        this.setState({ transactionDate: newDate });
        var object = {transactionDate: newDate};
        this.callback(object);
    }

    onImagePress = (imageURL) => {
        NavigationService.navigate('TransactionImage', {imageURL: imageURL});
    }

    onAmountPress = () => {
        NavigationService.navigate('CalculateTransaction', {onGoBack: (object) => this.rerender(object)});
    }

    onCategoryPress = () => {
        NavigationService.navigate('CategoriesList', {onGoBack: (object) => this.rerender(object)});
    }

    onChooseWalletPress = () => {
        NavigationService.navigate('ChooseWallet', {wallets: this.props.wallets, selectedWallet: this.props.selectedWallet, onGoBack: (object) => this.rerender(object)});
    }

    onOpenImagePickerPress = () => {
        // try{
        //     ImagePicker.openPicker({
        //         includeBase64: true
        //         }).then(image => {
        //             console.log(image);
        //             this.setState({
        //                 imageURL: image.data
        //             })
        //         })
        //         .catch (err => {

        //         });
        // } catch (err) {

        // }
        Alert.alert('Thông báo','Tính năng đang phát triển');
        
    }

    onOpenCameraPress = () => {
        // try {
        //     ImagePicker.openCamera({
        //         includeBase64: true
        //     }).then(image => {
        //         console.log(image.data);
        //         this.setState({
        //             imageURL: image.data
        //         })
        //     })
        //     .catch (err => {

        //     });
        // } catch (err) {

        // }
        Alert.alert('Thông báo','Tính năng đang phát triển');
    }

    onNoteChange = (vlue) => {
        this.setState({
            note: vlue
        })
        var object = {note: vlue}
        this.callback(object);
    }

    rerender = (object) => {
        var tAmount = this.state.amount;
        var tCategory = this.state.category;
        var tWallet = this.state.wallet;

        this.setState({
            amount: object.amount ? object.amount : tAmount,
            category: object.category ? object.category : tCategory,
            wallet: object.wallet ? object.wallet : tWallet,
        })
        this.callback(object);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.onImagePress(this.state.imageURL)}>
                    <Image  
                        style={{height: 200}}
                        resizeMode='cover'        
                        source={transactionImage} />
                </TouchableOpacity>
            
                <View style={styles.transactionInfo}>
                    <View style={styles.item}>
                        <View style={styles.iconContainer}>
                            
                        </View>
                        <Item style={{flex: 0.85}}>
                            <TouchableOpacity style={styles.itemPressable} onPress={this.onAmountPress}>
                                <MoneyText style={[styles.moneyText, {
                                        color: this.state.category.expenditureTypeID == -1 ? '#000' : 
                                        this.state.category.expenditureTypeID == 0 ? '#D0021B' : '#008FE5'}]} currencyType='đ' value={this.state.amount}/>
                            </TouchableOpacity>
                        </Item>
                    </View>
                
                    <View style={styles.item}>
                        <View style={styles.iconContainer}>
                            <Image source={{uri: this.state.category.logo}} style={{width: 30, height: 30}} resizeMode="contain"/>
                        </View>
                        <Item style={{flex: 0.85}}>
                            <TouchableOpacity style={styles.itemPressable} onPress={this.onCategoryPress}>
                                <Text style={[styles.category, {color: this.state.category.expenditureType == -1 ? 'gray' : '#000'}]}>{this.state.category.name}</Text>
                            </TouchableOpacity>
                        </Item>
                    </View>
                    
                    <View style={styles.item}>
                        <View style={styles.iconContainer}>
                            <Icon name='note-outline' type='MaterialCommunityIcons' style={{fontSize: 25, color: 'gray'}}/>
                        </View>
                        <Item style={{flex: 0.85}}>
                            <TextInput 
                                style={styles.note}
                                value={this.state.note} 
                                multiline numberOfLines={1} 
                                placeholderTextColor='gray' 
                                placeholder='Nhập ghi chú'
                                onChangeText={this.onNoteChange} />
                        </Item>
                    </View>
                    
                    <View style={styles.item}>
                        <View style={styles.iconContainer}>
                            <Icon name='calendar' type='MaterialCommunityIcons' style={{fontSize: 25, color: 'gray'}}/>
                        </View>
                        <Item style={{flex: 0.85}}>
                            <DatePicker
                                defaultDate={this.state.transactionDate}
                                minimumDate={new Date(2018, 1, 1)}
                                maximumDate={new Date(2018, 12, 31)}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                textStyle={{ color: "black" }}
                                placeHolderTextStyle={{ color: "gray", padding: 0, margin: 0 }}
                                onDateChange={this.setDate}
                                />
                        </Item>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.iconContainer}>
                            <Icon name='wallet' type='MaterialCommunityIcons' style={{fontSize: 25, color: 'gray'}}/>
                        </View>
                        <Item style={{flex: 0.85}}>
                            <TouchableOpacity style={styles.itemPressable} onPress={this.onChooseWalletPress}>
                                <Text style={[styles.wallet, {color: this.state.wallet.balance == -1 ? 'gray' : "#000"}]}>{this.state.wallet.name}</Text>
                            </TouchableOpacity>
                        </Item>
                    </View>
                </View>
                <View style={styles.transactionImage}>
                    <TouchableOpacity style={{flex: 0.5, alignItems: 'center', padding: 10}} onPress={this.onOpenImagePickerPress}>
                        <Icon name='image' type='Entypo' style={{color: 'gray'}} />
                    </TouchableOpacity>
                    <View
                        style={{
                        borderLeftWidth: 0.5,
                        borderLeftColor: 'gray',
                        }}
                        />
                    <TouchableOpacity style={{flex: 0.5, alignItems: 'center', padding: 10}} onPress={this.onOpenCameraPress}>
                        <Icon name='camera' type='Entypo' style={{color: 'gray'}} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column'
    },
    transactionImageContainer:{
        
    },
    transactionInfo:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    iconContainer:{
        flex: 0.1,
        padding: 10,
        alignItems: 'center',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    itemPressable:{
        flex: 1,
        padding: 10,
    },
    amount: {
        fontFamily: 'Roboto-Medium',
        fontSize: 25,
    },
    category: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    note:{
        flex: 1,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    transactionDate: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    wallet: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    transactionImage:{
        flexDirection: 'row',
        marginTop: 10,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    moneyText:{
        paddingRight: 10, 
        fontSize: 20, 
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
// export default TransactionInfo;
export default connect(mapStateToProps, mapDispatchToProps)(TransactionInfo);