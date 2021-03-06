import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, StatusBar, View, ScrollView, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as Colors from '../colors/colors.js';
import CustomNavBar from '../ui-elements/custom-nav-bar.js';
import axios from 'react-native-axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
var FRAME = Dimensions.get('window');


class VendorItemModal extends Component {

  static propTypes = {
    dismissFunc: PropTypes.func.isRequired,
    model: PropTypes.object
  };

  state = {
    nutritionFacts: []
  }

  componentDidMount () {
    console.log(this.props.model);

    let nutritionFacts = [];
    if(this.props.model.vegetarian) {
      nutritionFacts.push('Vegetarian');
    }
    if(this.props.model.vegan) {
      nutritionFacts.push('Vegan');
    }
    if(this.props.model.nutFree) {
      nutritionFacts.push('Nut Free');
    }
    if(this.props.model.dairyFree) {
      nutritionFacts.push('Dairy Free');
    }
    if(this.props.model.glutenFree) {
      nutritionFacts.push('Gluten Free');
    }

    this.setState({ nutritionFacts: nutritionFacts });
  }

  render() {

    return (
      <View style={styles.container} >
        <StatusBar
          barStyle="dark-content"
        />
        <CustomNavBar
          title={''}
          leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/back-arrow.png')} /> }
          leftOnPress={() => this.props.dismissFunc()} />

          <View style={styles.topContainer} >

            <View style={styles.topView_Image} >
              <Image style={styles.topImage} source={{ uri: this.props.model.image }} />
            </View>

            <View style={styles.infoContainer} >

              <TouchableOpacity onPress={this._onPress} style={{marginTop: 10}}>
                <Text style={styles.infoTitle}>{this.props.model.name}</Text>
              </TouchableOpacity>
              <Text style={styles.restaurantDescription}>{this.props.model.description}</Text>

              <View style={{marginTop: 32}}>
                  {this.state.nutritionFacts.map(fact =>
                      <View style={styles.nutritionFactStyle} key={fact} >
                        <View style={{justifyContent: 'center', backgroundColor: 'transparent', alignItems: 'center', width: 24, height: 24, borderRadius: 4, marginBottom: 8}} >
                          <Image source={require('../assets/images/check-mark.png')} style={{width: 10, height: 10, tintColor: Colors.LIGHT_GREY,  marginBottom: 6}} />
                        </View>
                        <Text style={{marginLeft: 16, color: Colors.DARK_GREY, fontFamily: 'varela-round'}}>Suitable for {fact} diets</Text>
                      </View>
                  )}
              </View>
            </View>
          </View>
      </View>
    );
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    nutritionFactsContainer:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
    nutritionFactStyle:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      marginLeft: 16,
      marginRight: 16,
      backgroundColor: 'transparent'
    },
    navBarLeftButton:{
      height: 16,
      width: 16,
      marginRight: 36,
      tintColor: '#41d9f4'
    },
    navBarRightButton:{
      height: 16,
      width: 16,
      marginLeft: 36,
      tintColor: '#41d9f4'
    },
    topContainer : {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    topView_Image: {
      height: 180
    },
    topImage: {
      width: FRAME.Width,
      height: 180,
      resizeMode: 'cover'
    },
    navBarLeftButton: {
      height: 16,
      width: 16,
      marginRight: 36

    },
    infoContainer: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: 'white',

    },
    infoTitle: {
      fontSize: 20,
      marginLeft: 16,
      marginRight: 16,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'varela-round'
    },
    resturantInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 20,
      marginTop: 16,
      marginLeft: 16,
      marginRight: 16,
    },
    restaurantDescription: {
      flexShrink: 1,
      fontSize: 16,
      lineHeight: 0,
      marginLeft: 16,
      marginRight: 16,
      textAlign: 'center',
      marginTop: 10,
      fontFamily: 'varela-round'
    },
    menuContainer: {
      flex: 1,
      flexDirection: 'column',
      alignContent: 'stretch',
      marginTop: 16,
    },
  });

  var mapStateToProps = (state) => {
    console.log(state);
   return {
     model: state.modal.model,
    //  nutritionFacts: ['dairy free', 'vegan', 'gluten free', 'vegetarian'],
   }
  }

  export default connect(mapStateToProps)(VendorItemModal);
