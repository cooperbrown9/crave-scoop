import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import RoundButton from '../ui-elements/round-button.js';
import PlaceDetailItem from '../ui-elements/place-detail-item.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomNavBar from '../ui-elements/custom-nav-bar';
import VendorItemModal from '../screens/VendorItemModal';
import * as NavActionTypes from '../action-types/navigation-action-types.js';
import axios from 'react-native-axios';


class PlaceDetailScreen extends React.Component {

  static navigationOptions = {
   header: null,
  };

 static propTypes = {

 };

 state = {
   titty: 'cool dude',
   model: {},
   vendorItemModalPresented: false,
   vendorLoaded: false,
   goingBack: false
 };

 _getHoursForDay() {
   const today = todayHours = this.props.model.info.hours[new Date().getDay()];
   let todayHours = today.open + today.open_tod + ' - ' + today.close + today.close_tod;

   return todayHours;
 };

 componentDidMount() {
   console.log(this.props.model.info);
   console.log("this one");
 }

 _dismissFilterModal = () => {
   this.setState({vendorItemModalPresented: false});
 }

 _presentFilterModal = () => {
   this.setState({vendorItemModalPresented: true});
 }

 handleKeyPress(item) {
   return function(e) {
     e.preventDefault();

     this.setState({vendorItemModalPresented: true});
    //  let model = { name: item.name, description: item.description };

     this.props.dispatch({type: 'VendorItemModal', model: { name: item.name, description: item.description }});
   }
 }

 render() {

   return(
     !this.state.goingBack ? (
     <ScrollView style={styles.ScrollContainer} >
       <CustomNavBar
         title={''}
         leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/back-arrow.png')}/>}
         leftOnPress={() => { this.props.navigation.goBack(); this.setState({goingBack: true}); } } />

       <Modal animationType={"slide"} transparent={false} visible={this.state.vendorItemModalPresented} >

         <VendorItemModal dismissFunc={this._dismissFilterModal} />

       </Modal>


       <View style={styles.topContainer} >

         <View style={styles.topView_Image} >
           <Image style={styles.topImage} source={require('../assets/images/fake-bg.png')}></Image>
         </View>

         <View style={styles.infoContainer} >

           <TouchableOpacity >
             <Text style={styles.infoTitle}>{this.props.model.name || ''}</Text>
           </TouchableOpacity>

           <View style={styles.resturantInfoContainer} >

             <View style={styles.resturantInfoContainer_Hours}>

               <Image style={{marginRight: 8, height:16, width: 16}} source={require('../assets/images/clock.png')}></Image>

               <Text style={{fontSize: 16, color: 'grey'}}>{this._getHoursForDay()}</Text>
             </View>

             <View style={styles.resturantInfoContainer_Addy}>

                 <Image style={{marginRight: 8, height:16, width: 16}} source={require('../assets/images/pin.png')}></Image>

               <Text style={{fontSize: 16, color: 'grey'}}>{this.props.model.location.address}</Text>
             </View>
           </View>

           <Text style={styles.restaurantDescription}>{this.props.model.info.description}</Text>

         </View>

       </View>

       <View style={styles.menuContainer} >

         {this.props.model.info.products.map(product => <PlaceDetailItem name={'bruh'} description={product.description} onPress={this.handleKeyPress(product).bind(this)} key={product.name} /> )}

       </View>

     </ScrollView>
     ) : null
   );
 }
}


const styles = StyleSheet.create({
 scrollContainer: {
   flex: 1
 },
 topContainer : {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'flex-start',
   alignItems: 'stretch',
 },
 topView_Image: {
   flex: 1
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
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'flex-start',
   alignItems: 'stretch'
 },
 infoTitle: {
   fontSize: 20,
   marginTop: 16,
   textAlign: 'center',
   fontWeight: 'bold'
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
   marginTop: 16
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
    model: (state.nav.index == 2) ? state.nav.routes[state.nav.index].params.model : { name: '' }
  }
}

export default connect(mapStateToProps)(PlaceDetailScreen);
