import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import * as Colors from '../colors/colors.js';
import CustomNavBar from '../ui-elements/custom-nav-bar.js';
import axios from 'react-native-axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class VendorItemModal extends React.Component {

  static propTypes = {
    dismissFunc: React.PropTypes.func.isRequired,
  };





  render() {

    return (
      <View style={styles.container} >

        <CustomNavBar
          title={''}
          leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/back-arrow.png')}/>}
          leftOnPress={() => this.props.dismissFunc()}/>

          <View style={styles.topContainer} >

            <View style={styles.topView_Image} >
              <Image style={styles.topImage} source={require('../assets/images/cake.png')}></Image>
            </View>

            <View style={styles.infoContainer} >

              <TouchableOpacity onPress={this._onPress} >
                <Text style={styles.infoTitle}>{this.props.model.name}</Text>
              </TouchableOpacity>
              <Text style={styles.restaurantDescription}>{this.props.model.description}</Text>

            </View>

          </View>
      </View>



    );
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
    topView_Image: {
      flex: 1,
      backgroundColor: 'green'
    },
    topImage: {
      height: 180
    },
    navBarLeftButton: {
      height: 16,
      width: 16,
      marginRight: 36

    },
    infoContainer: {
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: 'orange'
    },
    infoTitle: {
      fontSize: 20,
      marginTop: 16,
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: 'blue'
    },
    resturantInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 20,
      marginTop: 16,
      marginLeft: 16,
      marginRight: 16,
    },
    resturantInfoContainer_Hours: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginRight: 8
    },
    resturantInfoContainer_Addy: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 8
    },
    restaurantDescription: {
      flex: 1,
      fontSize: 16,
      lineHeight: 0,
      marginLeft: 16,
      marginRight: 16,
      textAlign: 'center',
      marginTop: 16,
      backgroundColor: 'yellow'
    },
    menuContainer: {
      flex: 1,
      flexDirection: 'column',
      alignContent: 'stretch',
      marginTop: 16,
    },
  });

  var mapStateToProps = (state) => {
   return {

     model: state.modal.model
   }
  }

  export default connect(mapStateToProps)(VendorItemModal);
