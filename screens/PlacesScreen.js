import React from 'react';
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
  Animated,
  Alert
} from 'react-native';
import { SearchBar } from 'react-native-elements';
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


class PlacesScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  static propTypes = {
    model: React.PropTypes.object,
  }

  state = {
    restaurants: [],
    loading: true,
    profilePresented: false,
    filterPresented: false,
    searchOn: false,
    searchPresented: false,
    canAccessLocation: false,
    animatedValue: 1
  }

  componentDidMount() {
    AsyncStorage.getItem(Keys.USER_ID, (err, result) => {
      console.log('places uid: ', this.props.user);
      this.props.dispatch(this.getUser(result, 'SPO').bind(this));
    });

  }

  componentWillMount() {
    this._getLocationAsync();
    this.getVendors();
  }

  _getLocationAsync = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      Alert.alert('You wont be able to query vendors based off your location');
    } else {
      this.setState({canAccessLocation: true});
      let location = await Location.getCurrentPositionAsync({});
      this.setState({latitude: location.coords.latitude, longitude: location.coords.longitude});
      this.props.dispatch({type: NavActionTypes.UPDATE_USER_LOCATION, latitude: location.coords.latitude, longitude: location.coords.longitude});
    }
  }


  getUser(userID, location) {
    return function (dispatch) {
      return axios.get('https://crave-scoop.herokuapp.com/get-user/' + userID).then(
        user => dispatch({type: NavActionTypes.GET_USER, user: user.data, location: location })
      ).catch(error => {
        Alert.alert('Couldnt load your profile');
        // kick you to login page
      })
    }
  }


  getVendors = () => {
    axios.get('https://crave-scoop.herokuapp.com/get-all-vendors-for-places/').then(response => {
      this.setState({restaurants: response.data, loading: false, filterPresented: false});
    }).catch(error => {
      console.log(error);
      Alert.alert('Couldnt load vendors at this time');
    });
  }

  renderVendorView(item) {
    return(
      <VendorView model={{ id: item._id, name: item.name }} onTouch={this.handleKeyPress(item).bind(this)} key={item._id} />
    )
  }
  _navigateHome = () => {
    this.props.navigation.dispatch({type: 'Home'});
  }

  _dismissSearchModal = (vendor) => {
    this.setState({searchPresented: false});
    return;

    axios.get('https://crave-scoop.herokuapp.com/get-vendor/' + vendor._id).then(
      response => this.props.navigation.dispatch({type: NavActionTypes.NAVIGATE_PLACES_DETAIL, model: response.data})
    ).then(() => {
      this.setState({searchPresented: false});
    }).catch(error => {
      console.log(error);
    });
    // this.props.navigation.dispatch({type: NavActionTypes.NAVIGATE_PLACES_DETAIL, id: item._id});
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
          this.setState({restaurants: response.data, profilePresented: false, filterPresented: false});
        }).finally(() => {
          this.setState({filterPresented: false})
        })
      }
    });
  }

  _loadNearbyVendors() {
    if (this.state.canAccessLocation) {
      let lon = this.props.location.longitude.toString();
      axios.get('https://crave-scoop.herokuapp.com/geolocate-vendors/' + this.props.location.latitude + '/' + lon.replace('-','') + '/' + '10').then((response) => {
        this.setState({restaurants: response.data, filterPresented: false});
      });
    } else {
      Alert.alert('We cant access your location!');
      this.setState({filterPresented: false});
    }
  }

  _vendorPickedSearch = (vendor) => {
    axios.get('https://crave-scoop.herokuapp.com/get-vendor/' + vendor._id).then(
      response => this.props.navigation.dispatch({type: NavActionTypes.NAVIGATE_PLACES_DETAIL, model: response.data})
    ).then(() => {
      this.setState({searchPresented: false});
    }).catch(error => {
      console.log(error);
    });
  }

  _searchKeyword = (word) => {
    axios.get('https://crave-scoop.herokuapp.com/search-vendors-test/' + word).then(response => {
      console.log(response);
      this.setState({restaurants: response.data, searchPresented: false});
    })
  }


  _resetVendors = () => {
    this.getVendors();
  }


  handleKeyPress(item) {
    return function(e) {
      e.preventDefault();

      axios.get('https://crave-scoop.herokuapp.com/get-vendor/' + item._id).then(
        response => this.props.navigation.dispatch({type: NavActionTypes.NAVIGATE_PLACES_DETAIL, model: response.data})
      )
    }
  }

  render() {

    return (

      <View style={(this.state.loading) ? styles.loadingHider : styles.container } >

        <CustomNavBar
          title={'PLACES'}
          leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/search.png')}/>}
          rightButton={<Image style={styles.navBarRightButton} source={require('../assets/images/settings.png')}/>}
          leftOnPress={this._presentSearchModal}
          rightOnPress={this._presentProfileModal} />


        <Modal animationType={'slide'} transparent={false} visible={this.state.profilePresented} >
          <ProfileScreen dismissFunc={this._dismissProfileModal.bind(this)} logOutFunc={this._navigateHome.bind(this)} renderFavorites={this._loadFavorites.bind(this)} />
        </Modal>

        <Modal animationType={'slide'} transparent={false} visible={this.state.searchPresented} >
          <SearchModal searchWord={this._searchKeyword.bind(this)} dismissModal={this._dismissSearchModal.bind(this)} vendorPicked={this._vendorPickedSearch.bind(this)} />
        </Modal>

        <Modal animationType={"slide"} transparent={false} visible={this.state.filterPresented} >
            <FilterModal resetVendors={this._resetVendors.bind(this)} renderNearby={this._loadNearbyVendors.bind(this)} renderFavorites={this._loadFavorites.bind(this)} filterFunc={this._dismissAndFilter.bind(this)} dismissFunc={this._dismissFilterModal.bind(this)} />
        </Modal>

        <Animated.ScrollView style={styles.scrollContainer} scrollEventThrottle={1} onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: 100 } } }],
            { useNativeDriver: true }
          )}
        >
        {/* <ScrollView style={styles.scrollContainer}>

          <View style={styles.itemContainer} >*/}
            {this.state.restaurants.map(model => <VendorView userFavorites={this.props.user.favorites} model={{id: model._id, name: model.name, like_count: model.like_count, image: model.background_image}} onTouch={this.handleKeyPress(model).bind(this)} key={model._id}/>)}

        {/*  </View>


         </ScrollView>*/}
      </Animated.ScrollView>
        <View style={styles.button}>
          <RoundButton title='Filters' onPress={this._presentFilterModal} bgColor={Colors.DARK_BLUE} borderOn={false}/>
        </View>

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

// export default PlacesScreen;
var mapStateToProps = (state) => {
  console.log(state);
  return {
    navigator: state.nav,
    user: state.user.user,
    location: state.location
  }
}

export default connect(mapStateToProps)(PlacesScreen);
