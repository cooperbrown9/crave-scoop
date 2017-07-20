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
} from 'react-native';
import axios from 'react-native-axios';
import VendorItem from '../ui-elements/vendor-item.js';
import { connect } from 'react-redux';


class PlacesScreen extends React.Component {

  static navigationOptions = {
    title: 'Places'
  };

  static propTypes = {
    model: React.PropTypes.object
  }

  state = {
    restaurants: [],
    loading: true,
    name: 'gfh'
  }

  static places;
  componentDidMount() {
    this.getRestaurants();
    console.log(this.state);
    console.log(this.props);
  }


  getRestaurants = () => {
    axios.get('https://crave-scoop.herokuapp.com/get-restaurants').then(response => {
      this.setState({restaurants: response.data, loading: false});
      console.log(this.state.restaurants);
    }).catch(error => {
      console.log('error fetching restaurants');
    });
  }

  handleKeyPress(item) {
    return function(e) {
      e.preventDefault();
      console.log(e);
      console.log(item);
      this.props.navigation.dispatch({type:'PlaceDetail', name: item.name, description: 'fgsfdgsf'});
    }

  }

  renderVendorItem(item) {
    return(
      <VendorItem model={{name: item.name}} onTouch={this.handleKeyPress(item).bind(this)} key={item._id} />
    )
  }


  _vendorPicked = (props) => {

    this.props.navigation.navigate('PlaceDetail', {model:{name: 'Cool Cakes'}});
  }

  render() {
    const model = {name: 'abc', likeCount: '420'}
    let counter = 0;
    return (
      <View style={styles.container}>

          <ScrollView style={styles.scrollContainer}>
            <View style={styles.itemContainer} >
              {/*this.state.restaurants.map(this.renderVendorItem)*/}
              {this.state.restaurants.map(model => <VendorItem model={model} onTouch={this.handleKeyPress(model).bind(this)} key={model._id}/>)}

            </View>
            <View backgroundColor={(this.state.loading) ? 'orange' : 'green'} style={{height:32, width: 32}}></View>
            <Text>{this.props.name}</Text>
          </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column'
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
});

var mapStateToProps = (state) => {
  return {
    navigator: state.nav,
    name: state.nav.name
  }
}

export default connect(mapStateToProps)(PlacesScreen);
