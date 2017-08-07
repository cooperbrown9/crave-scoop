import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
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
    dismissModal: React.PropTypes.func.isRequired
  }

  _onChangeText(text) {
    console.log(text);
    this.setState({searchText: text});
    this.queryVendors(text);
  }

  queryVendors = (str) => {
    axios.get('https://crave-scoop.herokuapp.com/search-vendors/' + str).then(response => {
      console.log(response.data);
      this.setState({vendors: response.data});
    }).catch(error => {
      console.log('nah', error);
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer} >
            <Image style={styles.searchIcon} source={require('../assets/images/search.png')} />
            <TextInput style={styles.searchBar} placeholder='Search...' editable={true} onChangeText={(text)=> {this._onChangeText(text)} }/>
            <TouchableOpacity onPress={() => this.props.dismissModal()}>
              <Image style={styles.resetIcon} source={require('../assets/images/close.png')} />
            </TouchableOpacity>
          </View>
          <View style={{height: 64}}></View>

          <View style={this.vendorView} >
            {this.state.vendors.map(vendor =>
              <TouchableOpacity onPress={() => this.props.dismissModal(vendor)} key={vendor.name}>
                <Text style={{backgroundColor:'transparent', fontSize: 28, fontWeight: 'bold', height: 32, textAlign: 'center', marginTop: 32}} color='green'>{vendor.name}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.button}>
          <RoundButton title='SEARCH' borderOn={false} bgColor={Colors.DARK_BLUE} onPress={() => this.props.dismissModal('bruuuuuh')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
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
    marginBottom: 16
  }
});

export default SearchModal;
