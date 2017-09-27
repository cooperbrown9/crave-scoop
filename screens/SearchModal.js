import React from 'react';
import { View, Text, StatusBar, TextInput, Button, TouchableOpacity, ActivityIndicator, Image, StyleSheet, Dimensions } from 'react-native';
import axios from 'react-native-axios';
import RoundButton from '../ui-elements/round-button.js';
import * as Colors from '../colors/colors.js';

class SearchModal extends React.Component {
  state = {
    vendors: [],
    searchText: '',
    loading: false
  }

  static propTypes = {
    dismissModal: React.PropTypes.func.isRequired,
    vendorPicked: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    searchWord: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    loading: false
  }

  _onChangeText(text) {
    console.log(text);
    this.setState({searchText: text});
    this.queryVendors(text);
  }

  queryVendors = (str) => {
    this.setState({loading: true});
    axios.get('https://crave-scoop.herokuapp.com/search-vendors-test/' + str).then(response => {
      console.log(response.data);
      this.setState({vendors: response.data, loading: false});
    }).catch(error => {
      console.log('nah', error);
    });
  }

  searchWord() {
    this.props.searchWord(this.state.searchText);
  }

  componentWillUnmount() {
    this.setState({loading: false});
  }

  render() {
    const frame = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />

        <View style={styles.container}>

          <View style={styles.searchBarContainer} >

            <Image style={styles.searchIcon} source={require('../assets/images/search.png')} />
            <TextInput style={styles.searchBar} autoCapitalize={'none'} placeholder='Search...' editable={true} onChangeText={(text)=> {this._onChangeText(text)} }/>

            <TouchableOpacity onPress={() => this.props.dismissModal()}>
              <Image style={styles.resetIcon} source={require('../assets/images/close.png')} />
            </TouchableOpacity>

          </View>

          <View style={{height: 64}}></View>

          <View style={this.vendorView} >
            {(this.state.vendors.length > 0) ? this.state.vendors.map(vendor =>
              <TouchableOpacity onPress={() => this.props.vendorPicked(vendor)} key={vendor.name}>
                <Text style={styles.resultsText} color='green'>{vendor.name}</Text>
              </TouchableOpacity>
            ) :
          <Text style={styles.noResultsText} color='green'>No Results</Text>}
          </View>
        </View>

        <View style={styles.button}>
          <RoundButton title='SEARCH' borderOn={false} bgColor={Colors.DARK_BLUE} onPress={() => this.searchWord()} />
        </View>

        {this.state.loading ?
        <View style={{position: 'absolute', top: 0, left: 0,height: frame.height, width: frame.width, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          <ActivityIndicator animating={this.state.loading} size='large' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} />
        </View>
        : null }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    zIndex: 0
  },
  vendorView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginLeft: 32,
    marginRight: 64,
    marginTop: 32,
    backgroundColor: 'red'
  },
  searchBarContainer: {
    marginTop: 16,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  resultsText: {
    backgroundColor: 'transparent',
    fontFamily: 'varela-round',
    fontSize: 28,
    height: 32,
    marginTop: 32,
    marginLeft: 32,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  noResultsText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'varela-round',
    fontSize: 28,
    height: 32,
    marginTop: 32
  },
  searchBar: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    marginLeft: 16,
    marginRight: 8
  },
  searchIcon: {
    marginLeft: 16,
    width: 16,
    height: 16,
  },
  resetIcon: {
    width: 16,
    height: 16,
    marginRight: 16,
    tintColor: Colors.LIGHT_GREY
  },
  button: {
    marginLeft: 64,
    marginRight: 64,
    marginBottom: 32,
    zIndex: 3
  }
});

export default SearchModal;
