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
  ActivityIndicator
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
    searchPresented: false
  }

  componentDidMount() {
    this.getVendors();
    this.getUser();
  }

  getUser = () => {
    axios.get('https://crave-scoop.herokuapp.com/get-user/59765b461a79980011c99d2c/').then(response => {
      this.setState({user: response.data});
    }).catch(error => {
      console.log('couldnt get user from places screen');
    });
  }

  getVendors = () => {
    axios.get('https://crave-scoop.herokuapp.com/get-all-vendors-for-places/').then(response => {
      this.setState({restaurants: response.data, loading: false});
    }).catch(error => {
      console.log(error);
    });
  }

  handleKeyPress(item) {
    return function(e) {
      e.preventDefault();

      axios.get('https://crave-scoop.herokuapp.com/get-vendor/' + item._id).then(
        response => this.props.navigation.dispatch({type: NavActionTypes.NAVIGATE_PLACES_DETAIL, model: response.data})
      )
    }
  }

  renderVendorView(item) {
    return(
      <VendorView model={{ id: item._id, name: item.name }} onTouch={this.handleKeyPress(item).bind(this)} key={item._id} />
    )
  }

  _presentProfileModal = () => {
    this.setState({profilePresented: true});
  }

  _dismissProfileModal = () => {
    this.setState({profilePresented: false});
  }

  _dismissSearchModal = (vendor) => {
    axios.get('https://crave-scoop.herokuapp.com/get-vendor/' + vendor._id).then(
      response => this.props.navigation.dispatch({type: NavActionTypes.NAVIGATE_PLACES_DETAIL, model: response.data})
    ).then(() => {
      this.setState({searchPresented: false});
    });
    // this.props.navigation.dispatch({type: NavActionTypes.NAVIGATE_PLACES_DETAIL, id: item._id});
  }

  _presentSearchModal = () => {
    this.setState({searchPresented: true});
  }

  _dismissFilterModal = () => {
    this.state.filterPresented = false;
    this.setState(this.state);
  }

  _presentFilterModal = () => {
    this.state.filterPresented = true;
    this.setState(this.state);
  }

  dismissAndFilter(vendors) {
    this.setState({filterPresented: false, restaurants: vendors});
  }

  _autocomplete(text) {

    (text === '') ? this.getRestaurants() : null;

    for(let i = 0; i < this.state.restaurants.length; i++) {

      if(!this.state.restaurants[i].name.includes(text)) {
        this.state.restaurants.splice(i, 1);
        i--;
      }
    }
    this.setState({restaurants: this.state.restaurants});
  }

  _startSearch() {
    this.setState({searchOn: !this.state.searchOn });

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
          <ProfileScreen dismissFunc={this._dismissProfileModal.bind(this)} />
        </Modal>

        <Modal animationType={"slide"} transparent={false} visible={this.state.filterPresented} >
            <FilterModal filterFunc={this.dismissAndFilter.bind(this)} dismissFunc={this._dismissFilterModal.bind(this)} />
        </Modal>

        <ScrollView style={styles.scrollContainer}>

          <View style={styles.itemContainer} >
            {this.state.restaurants.map(model => <VendorView userFavorites={this.state.user.favorites} model={{id: model._id, name: model.name, like_count: model.like_count}} onTouch={this.handleKeyPress(model).bind(this)} key={model._id}/>)}

            </View>

        </ScrollView>

        <View style={styles.button}>
          <RoundButton title='FILTERS' onPress={this._presentFilterModal} bgColor={Colors.DARK_BLUE} borderOn={false}/>
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
    tintColor: '#41d9f4'
  },
  navBarRightButton:{
    height: 16,
    width: 16,
    marginLeft: 36,
    tintColor: '#41d9f4'

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

export default PlacesScreen;

// var mapStateToProps = (state) => {
//   console.log(state);
//
//   return {
//     navigator: state.nav
//   }
// }

// export default connect(mapStateToProps)(PlacesScreen);
