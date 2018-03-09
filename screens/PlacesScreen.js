import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Modal,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  Dimensions,
  StatusBar
} from 'react-native';
import axios from 'react-native-axios';
import VendorView from '../ui-elements/vendor-view.js';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import * as Colors from '../colors/colors.js';
import CustomNavBar from '../ui-elements/custom-nav-bar.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import RoundButton from '../ui-elements/round-button.js';
import FilterModal from './FilterModal.js';
import * as NavActionTypes from '../action-types/navigation-action-types.js';
import SearchModal from './SearchModal.js';
import * as Keys from '../local-storage/keys.js';

import { Constants, Location, Permissions } from 'expo';


class PlacesScreen extends Component {

  static navigationOptions = {
    header: null
  };

  static propTypes = {
    model: PropTypes.object,
  }

  state = {
    restaurants: [],
    loading: false,
    profilePresented: false,
    filterPresented: false,
    searchPresented: false,
    canAccessLocation: false,
    animatedValue: 1,
    vendorsLoaded: true,
    empty: false,
    emptyStateText: 'You do not have any favorites!'
  }

  componentDidMount() {
    this.setState({ loading: true });
    AsyncStorage.getItem(Keys.USER_ID, async(err, result) => {
      await this._getLocationAsync();

      // get vendors within 50 mile radius
      await this.getInitialVendors(5000);
    });
  }

  componentWillMount() {

  }


  _getLocationAsync = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      Alert.alert('You wont be able to query vendors based off your location');
    } else {
      this.setState({ canAccessLocation: true });
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      this.props.dispatch({ type: NavActionTypes.UPDATE_USER_LOCATION, latitude: location.coords.latitude, longitude: location.coords.longitude });
    }
  }


  getInitialVendors = async(radius) => {
    // this forces the views not to render
    this.setState({ empty: false, loading: true });
    // this.props.location.latitude = 47.59;
    // this.props.location.longitude = -117.406417;
    console.log(this.props.location.latitude + ' ' + this.props.location.longitude);
    if(this.state.canAccessLocation) {
      axios.get('https://crave-scoop.herokuapp.com/geolocate-vendors/' + this.props.location.latitude + '/' + this.props.location.longitude + '/' + radius).then(response => {
        if(response.data.length < 1) {
          this.setState({ vendorsLoaded: true, loading: false, empty: true, emptyStateText: 'There are no restaurants close to you!', filterPresented: false });
        } else if(response.data.length === 1 || response.data.length === 2) {
          this.setState({ restaurants: response.data, vendorsLoaded: true, loading: false, empty: false, filterPresented: false })
        } else {
          for(let i = 0; i < response.data.length - 1; i++) {
            for(let j = 1; j < response.data.length; j++) {
              if(response.data[i].distanceFromUser > response.data[j].distanceFromUser) {
                let temp = response.data[i];
                response.data[i] = response.data[j];
                response.data[j] = temp;
              }
            }
            if(i === response.data.length - 2) {
              this.setState({ restaurants: response.data, vendorsLoaded: true, loading: false, empty: false, filterPresented: false });
            }
          }
        }
      }).catch(error => {
        Alert.alert('Could not load vendors in your area');
      });
    } else {
      // Alert.alert('We need to get your location to load vendors near you');
      await setTimeout(async() => { await this._getLocationAsync(); this.getInitialVendors() }, 2000);
    }
  }

  reloadVendors() {
    this.setState({ vendorsLoaded: false, loading: true });
    this.getInitialVendors(5000);
  }

  getVendors = () => {
    this.setState({ loading: true });
    axios.get('https://crave-scoop.herokuapp.com/get-all-vendors-for-places/')
    .then(response => {
      this.setState({ restaurants: response.data, vendorsLoaded: true, loading: false, filterPresented: false });
    }).catch((error) => {
      if(!error.message.includes('Cannot read property')) {
        console.log(error);
        Alert.alert('Couldnt load vendors at this time');
        this.setState({ vendorsLoaded: false, loading: false, empty: true, emptyStateText: 'Could not load vendors' });
      }
    });
  }

  scrollableNodeError(e) {
    if(!e.message.includes('Cannot read property')) {
      console.log(e);

    }
  }

  renderVendorView(item) {
    return(
      <VendorView model={{ id: item._id, name: item.name }} onTouch={this.handleKeyPress(item).bind(this)} key={item._id} />
    )
  }

  _navigateHome = () => {
    axios.get('https://crave-scoop.herokuapp.com/logout').then(response => {
      this.props.navigation.dispatch({ type: 'Home' });
    }).catch(e => {
      console.log(e);
      Alert.alert('Couldnt log out at this time');
    })
  }

  _emptyQueryState = (query) => {
    this.setState({ empty: true, profilePresented: false, filterPresented: false});
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <Text style={{ flex: 1, fontFamily: 'varela-round', fontSize: 28, alignItems: 'center', justifyContent:'center' }}>No {query}</Text>
      </View>
    );
  }

  _dismissSearchModal = (vendor) => {
    this.setState({ searchPresented: false });
    return;

    axios.get('https://crave-scoop.herokuapp.com/get-vendor/' + vendor._id).then(
      response => this.props.navigation.dispatch({ type: NavActionTypes.NAVIGATE_PLACES_DETAIL, model: response.data })
    ).then(() => {
      this.setState({searchPresented: false});
    }).catch(error => {
      console.log(error);
    });
  }

  _presentSearchModal = () => {
    this.setState({searchPresented: true});
  }

  _dismissProfileModal = () => {
    this.setState({profilePresented: false});
  }

  _presentProfileModal = () => {
    this.setState({profilePresented: true});
  }

  _dismissFilterModal = () => {
    this.setState({filterPresented: false});
  }

  _dismissAndFilter = (vendors) => {
    this.setState({filterPresented: false, restaurants: vendors});
  }

  _presentFilterModal = () => {
    this.setState({filterPresented: true});
  }

  _loadFavorites() {
    AsyncStorage.getItem(Keys.USER_ID, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        axios.get('https://crave-scoop.herokuapp.com/get-favorite-vendors/' + result).then((response) => {
          // remove null vendors, in case they were deleted in db
          let vendors = [];
          for(let i = 0; i < response.data.length; i++) {
            if(response.data[i] !== null) {
              vendors.push(response.data[i]);
            }
          }
          if(vendors.length < 1) {
            this.setState({ empty: true, emptyStateText: 'You do not have any favorite restaurants!' });
          } else {
            this.setState({restaurants: vendors, profilePresented: false, filterPresented: false});
          }
        }).catch(e => {
          this.setState({ filterPresented: false, profilePresented: false });
          // setTimeout(() => { Alert.alert('You do not have any favorites!')}, 1000);
        }).finally((status) => {
          this.setState({filterPresented: false, profilePresented: false });
        })
      }
    });
  }

  _loadNearbyVendors() {
    if (this.state.canAccessLocation) {
      let lon = this.props.location.longitude.toString();

      // last parameter is the radius u want restaurants within
      axios.get('https://crave-scoop.herokuapp.com/geolocate-vendors/' + this.props.location.latitude + '/' + lon + '/' + '100').then((response) => {
        if(response.data.length < 1) {
          this.setState({ empty: true, emptyStateText: 'There are no nearby restaurants!', filterPresented: false, profilePresented: false });
          // Alert.alert('Oops!', 'There are no restaurants close to you!', [ {text: 'OK!', onPress: () => this.setState({filterPresented: false})} ]);
        } else {
          for(let i = 0; i < response.data.length - 1; i++) {
            for(let j = 1; j < response.data.length; j++) {
              if(response.data[i].distanceFromUser > response.data[j].distanceFromUser) {
                let temp = response.data[i];
                response.data[i] = response.data[j];
                response.data[j] = temp;
              }

            }
          }
          this.setState({ restaurants: response.data, filterPresented: false });
        }
      });
    } else {
      Alert.alert('We cant access your location!');
      this.setState({ filterPresented: false });
    }
  }

  _vendorPickedSearch = (vendor) => {
    axios.get('https://crave-scoop.herokuapp.com/get-vendor/' + vendor._id).then(response => {
      let newProducts = [];
      for(let i = 0; i < response.data.products.length; i++) {
        if(response.data.products[i].instock === 'available') {
          newProducts.push(response.data.products[i]);
        }
      }
      response.data.products = newProducts;
      this.props.navigation.dispatch({type: NavActionTypes.NAVIGATE_PLACES_DETAIL, model: response.data})

    }).then(() => {
      this.setState({searchPresented: false});
    }).catch(error => {
      console.log(error);
    });
  }

  _searchKeyword = (word) => {
    axios.get('https://crave-scoop.herokuapp.com/search-vendors-test/' + word).then(response => {
      this.setState({restaurants: response.data, searchPresented: false});
    }).catch(error => {
      console.log(error);
    })
  }

  // after vendor is liked/unliked, stores user on redux so that
  // place detail favorites is updated
  _updateUser = () => {
    AsyncStorage.getItem(Keys.USER_ID, (e1, userID) => {
      if (e1) {
        this.props.dispatch({ type: 'START_HOME' });
      }
      AsyncStorage.getItem(Keys.SESSION_ID, (e2, sessionID) => {
        if(e2) {
          this.props.dispatch({ type: 'START_HOME' });
        } else {
          axios.get('https://crave-scoop.herokuapp.com/user/' + sessionID + '/' + userID).then(response => {
            this.props.dispatch({ type: 'LOGIN_SUCCESSFUL', user: response.data });
          }).catch(e => {
            Keys.resetKeys(() => {
              console.log(e);
              this.props.dispatch({ type: 'FINISH_LOADING' });
              this.props.dispatch({ type: 'START_HOME' });
            });
          });
        }
      });
    });
  }

  _resetVendors = () => {
    this.getInitialVendors(50);
  }

  handleKeyPress(item) {
    return function(e) {
      e.preventDefault();

      axios.get('https://crave-scoop.herokuapp.com/get-vendor/' + item._id).then(
        response => {

          let newProducts = [];
          for(let i = 0; i < response.data.products.length; i++) {
            if(response.data.products[i].instock === 'available') {
              newProducts.push(response.data.products[i]);
            }
          }
          response.data.products = newProducts;
          this.props.navigation.dispatch({ type: NavActionTypes.NAVIGATE_PLACES_DETAIL, model: response.data });
        }
      );
    }
  }

  render() {
    let { width, height } = Dimensions.get('window');
    return (

      <View style={styles.container } >
        <StatusBar
          barStyle="dark-content"
        />

        {(!this.state.vendorsLoaded) ?
          <View style={{position: 'absolute', left:0,right:0,top:0,bottom:0,zIndex:4,backgroundColor:'white'}}>
            <TouchableOpacity style={{ left:0, right:0, top:120 }} onPress={this.getVendors}>
              <Text style={{color: 'blue', fontSize: 24, textAlign: 'center', color:Colors.DARK_GREY, fontFamily: 'varela-round' }}>
                Couldn't load Vendors
              </Text>
              <View style={{marginLeft: 64, marginRight: 64, marginTop: 32}}>
                <RoundButton title='RELOAD' onPress={() => this.getVendors()} bgColor={Colors.DARK_BLUE} borderOn={false} />
              </View>
            </TouchableOpacity>
        </View>
          : null
        }

        <CustomNavBar
          title={'PLACES'}
          leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/search.png')}/>}
          rightButton={<Image style={styles.navBarRightButton} source={require('../assets/images/settings.png')}/>}
          leftOnPress={this._presentSearchModal}
          rightOnPress={this._presentProfileModal}
        />

      <Modal animationType={'slide'} transparent={false} visible={this.state.profilePresented} styles={{marginTop: 0}}>
          <ProfileScreen dismissFunc={this._dismissProfileModal.bind(this)} logOutFunc={this._navigateHome.bind(this)} renderFavorites={this._loadFavorites.bind(this)} />
        </Modal>

        <Modal animationType={'slide'} transparent={false} visible={this.state.searchPresented} >
          <SearchModal searchWord={this._searchKeyword.bind(this)} dismissModal={this._dismissSearchModal.bind(this)} vendorPicked={this._vendorPickedSearch.bind(this)} />
        </Modal>

        <Modal animationType={'slide'} transparent={false} visible={this.state.filterPresented} >
            <FilterModal resetVendors={this._resetVendors.bind(this)} renderNearby={this._loadNearbyVendors.bind(this)} renderFavorites={this._loadFavorites.bind(this)} filterFunc={this._dismissAndFilter.bind(this)} dismissFunc={this._dismissFilterModal.bind(this)} />
        </Modal>


         <ScrollView style={styles.scrollContainer}>
          {(!this.state.empty) ?
          <View style={styles.itemContainer} >
            {this.state.restaurants.map(model =>
              <VendorView
              updateUser={this._updateUser.bind(this)}
              userFavorites={this.props.user.favorites}
              model={{id: model._id, name: model.name, like_count: model.like_count, image: model.background_image}}
              onTouch={this.handleKeyPress(model).bind(this)}
              key={model._id}
              />
          )}
          </View>
          : (<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ flex: 1, fontFamily: 'varela-round', fontSize: 28, alignItems: 'center', justifyContent:'center', marginTop: 64 }}>{this.state.emptyStateText}</Text>
            <View style={{ position: 'absolute', top: 180, left: 0, right: 0, marginLeft: 32, marginRight: 32 }}>
              <RoundButton title='RELOAD' onPress={() => {this.getInitialVendors(50)}} bgColor={Colors.DARK_BLUE} borderOn={false} />
            </View>
        </View>)
          }
         </ScrollView>

         {!this.state.empty ?
        <View style={styles.button}>
          <RoundButton title='FILTERS' onPress={this._presentFilterModal} bgColor={Colors.DARK_BLUE} borderOn={false} />
        </View>
        : null
      }


        {(this.state.loading) ?
        <View style={{position: 'absolute', top: 0, left: 0,height: height, width: width, backgroundColor: 'white', zIndex: 4 }}>
          <ActivityIndicator animating={this.state.loading} size='large' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} />
        </View>
        : null }

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  navBarLeftButton:{
    height: 16,
    width: 16,
    marginRight: 36,
    tintColor: Colors.DARK_BLUE
  },
  navBarRightButton:{
    height: 16,
    width: 16,
    marginLeft: 36,
    tintColor: Colors.DARK_BLUE

  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 16
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 140,
    height: 38,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  loadingHider: {
    display: 'none',
  },
  filterButton: {
    marginLeft: 64,
    marginRight: 64,
    backgroundColor: 'transparent'
  },
  button: {
    position: 'absolute',
    right: 0,
    left: 0,
    marginLeft: 100,
    marginRight: 100,
    bottom: 0
  }
});

var mapStateToProps = (state) => {
  return {
    navigator: state.nav,
    user: state.auth.user,
    location: state.location,
    loadUserSuccess: state.user.success
  }
}

export default connect(mapStateToProps)(PlacesScreen);
