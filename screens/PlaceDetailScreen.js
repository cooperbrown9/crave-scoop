import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import RoundButton from '../ui-elements/round-button.js';
import PlaceDetailItem from '../ui-elements/place-detail-item.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomNavBar from '../ui-elements/custom-nav-bar';
import VendorItemModal from '../screens/VendorItemModal';



class PlaceDetailScreen extends React.Component {
 static navigationOptions = {
   header: null
 };

 static propTypes = {
   model: React.PropTypes.object.isRequired,

 };

 state = {
   titty: 'cool dude',
   vendorItemModalPresented: false
 };


 _onPress = () => {
   // console.log(this.props);
   this.setState({titty: ''})
 };

 _getHoursForDay() {
   const today = todayHours = this.props.model.hours[new Date().getDay()];
   let todayHours = today.open + today.open_tod + ' - ' + today.close + today.close_tod;

   return todayHours;
 };

 componentDidMount() {
   console.log(this.props.model);
 }

 _dismissFilterModal = () => {
   this.state.vendorItemModalPresented = false;
   this.setState(this.state);
 }

 _presentFilterModal = () => {
   this.state.vendorItemModalPresented = true;
   this.setState(this.state);
 }

 handleKeyPress(item) {
   return function(e) {
     e.preventDefault();
     this.setState({vendorItemModalPresented: true});
     let model = { name: item.name, description: item.description };
     this.props.dispatch({type: 'VendorItemModal', model: model});
   }
 }

 render() {

   return(
     <ScrollView style={styles.ScrollContainer} >
       <CustomNavBar
         title={''}
         leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/back-arrow.png')}/>}
         leftOnPress={() => this.props.navigation.goBack()}/>
       <Modal animationType={"slide"} transparent={false} visible={this.state.vendorItemModalPresented} >

             <VendorItemModal dismissFunc={this._dismissFilterModal} />

         </Modal>
       <View style={styles.topContainer} >

         <View style={styles.topView_Image} >
           <Image style={styles.topImage} source={require('../assets/images/fake-bg.png')}></Image>
         </View>

         <View style={styles.infoContainer} >

           <TouchableOpacity onPress={this._onPress} >
           <Text style={styles.infoTitle}>{this.props.model.name}</Text>
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

           <Text style={styles.restaurantDescription}>{this.props.model.description}</Text>

         </View>

       </View>

       <View style={styles.menuContainer}>

         {this.props.model.products.map(product => <PlaceDetailItem name={product.name} description={product.description} onPress={this.handleKeyPress(product).bind(this)} key={product.name} /> )}

       </View>

     </ScrollView>
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
    model: state.nav.routes[state.nav.index].params.model
  }
}

export default connect(mapStateToProps)(PlaceDetailScreen);
