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
  Modal
} from 'react-native';
import axios from 'react-native-axios';
import VendorItem from '../ui-elements/vendor-item.js';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import * as Colors from '../colors/colors.js';
import CustomNavBar from '../ui-elements/custom-nav-bar.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import RoundButton from '../ui-elements/round-button.js';
import FilterModal from './FilterModal.js';
import * as NavActionTypes from '../action-types/navigation-action-types.js';


class PlacesScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  static propTypes = {
    model: React.PropTypes.object
  }

  state = {
    restaurants: [],
    loading: true,
    name: 'gfh',
    profilePresented: false,
    filterPresented: false

  }

  static places;
  componentDidMount() {
    this.getRestaurants();
    this.getUser();

  }

  getUser = () => {
    axios.get('https://crave-scoop.herokuapp.com/get-user/59765d2df60c01001198f3b5/').then(response => {
      this.setState({user: response.data});
    }).catch(error => {
      console.log('couldnt get user from places screen');
    });
  }

  getRestaurants = () => {
    axios.get('https://crave-scoop.herokuapp.com/get-vendors/').then(response => {
      this.setState({restaurants: response.data, loading: false});
    }).catch(error => {

    });
  }

  handleKeyPress(item) {
    return function(e) {
      e.preventDefault();

      let model = { id: item._id, name: item.name, location: item.info.location, description: item.info.description, hours: item.info.hours, products: item.info.products }
      this.props.navigation.dispatch({type: NavActionTypes.NAVIGATE_PLACES_DETAIL, model: model});
      
    }
  }

  renderVendorItem(item) {
    return(
      <VendorItem model={{ id: item._id, name: item.name }} onTouch={this.handleKeyPress(item).bind(this)} key={item._id} />
    )
  }

  _dismissProfileModal = () => {
    this.state.profilePresented = false;
    this.setState(this.state);
  }

  _presentProfileModal = () => {
    this.state.profilePresented = true;
    this.setState(this.state);
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
    console.log(rest);
    this.state.restaurants = vendors;
    this.setState({filterPresented: false});
    // debugger;
    // this.state.restaurants = rest;
    // this.setState(this.state);
  }

  _vendorPicked = (props) => {
    this.props.navigation.navigate('PlaceDetail', {model:{name: 'Cool Cakes'}});
  }

  render() {
    return (
      <View style={(this.state.loading) ? styles.loadingHider : styles.container } >

        <CustomNavBar
          title={''}
          leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/search.png')}/>}
          rightButton={<Image style={styles.navBarRightButton} source={require('../assets/images/settings.png')}/>}
          leftOnPress={() => this.props.navigation.goBack()}
          rightOnPress={this._presentProfileModal}/>

        <Modal animationType={"slide"} transparent={false} visible={this.state.filterPresented} >

            <FilterModal filterFunc={this.dismissAndFilter} dismissFunc={this._dismissFilterModal} />

        </Modal>

        <ScrollView style={styles.scrollContainer}>

          <View style={styles.itemContainer} >
            {this.state.restaurants.map(model => <VendorItem userFavorites={this.state.user.favorites} model={{id: model._id, name: model.name, like_count: model.like_count}} onTouch={this.handleKeyPress(model).bind(this)} key={model._id}/>)}

            </View>

        </ScrollView>

        <View style={styles.filterButton}>
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
  }
});


var mapStateToProps = (state) => {
  console.log(state);
  return {
    navigator: state.nav,
  }
}

export default connect(mapStateToProps)(PlacesScreen);
