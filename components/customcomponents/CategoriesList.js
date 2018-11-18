import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import { Container, Content } from 'native-base';
import Tree from './../customcomponents/Tree';

class CategoriesList extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
        }
        
    }

    componentDidMount(){
        
    }

    onCategoryPress = (category) => {
        this.props.onCategoryPress(category);
    }

    render() {
        return (
            <Content>
                <View style={styles.container}>
                {this.props.categories.map((root, index) => {
                    return (
                    <View key={index}>
                        {root.parentID == root.id ? 
                        <TouchableOpacity style={styles.root} onPress={() => this.onCategoryPress(root)}>
                            <Image source={{uri: root.logo}} style={styles.categoryRootLogo} resizeMode="contain"/>
                            <Text style={styles.categoryRootName}>{root.name}</Text>
                        </TouchableOpacity>
                        :
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column'}}>
                                <View key={index}>
                                    <Tree index={index} />
                                </View>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <View key={index} style={{flexDirection: 'column'}}>
                                    <TouchableOpacity style={styles.child} onPress={() => this.onCategoryPress(root)}>
                                        <Image source={{uri: root.logo}} style={styles.categoryChildLogo} resizeMode="contain"/>
                                        <View>
                                            <Text style={styles.categoryChildName}>{root.name}</Text>
                                        </View> 
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        }
                    </View>
                    )
                })}
                </View>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 10
    },
    root: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 5,
    },
    categoryRootLogo: {
        width: 40, 
        height: 40, 
        borderRadius: 20,
    },
    categoryRootName:{
        marginLeft: 10,
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color: '#000'
    },
    child:{
        marginBottom: 10,
        flexDirection: 'row', 
        alignItems: 'center',
    },
    categoryChildLogo: {
        width: 30, 
        height: 30, 
        borderRadius: 15,
        marginRight: 10,
    },
    categoryChildName:{
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: '#000'
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
export default CategoriesList;
// export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
                