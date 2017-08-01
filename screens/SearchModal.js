import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'react-native-axios';

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
    debugger;
    axios.get('https://crave-scoop.herokuapp.com/search-vendors/' + str).then(response => {
      console.log(response.data);
      this.setState({vendors: response.data});
    }).catch(error => {
      console.log('nah', error);
    });
  }


  render() {

    return (
      <View>
        <View style={styles.searchBarContainer} >
          <Image style={styles.searchIcon} source={require('../assets/images/close.png')} />
          <TextInput style={styles.searchBar} placeholder='Search...' editable={true} onChangeText={(text)=> {this._onChangeText(text)} }/>
          <Image style={styles.resetIcon} source={require('../assets/images/close.png')} />
        </View>

          {this.state.vendors.map(vendor =>

              <Text style={{backgroundColor:'green'}} color='green' >{vendor.name}</Text>

          )}

        <Button style={{marginTop: 100}}title='hit' onPress={() => this.props.dismissModal('bruuuuuh')}></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  vendorView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginLeft: 32,
    marginRight: 64
  },
  searchBarContainer: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gold',
    fontSize: 18,
    backgroundColor: 'orange',
    color: 'green',
    marginLeft: 8,
    marginRight: 8
  },
  searchIcon: {
    marginLeft: 16,
    width: 24,
    height: 24,
    backgroundColor: 'yellow'
  },
  resetIcon: {
    width: 24,
    height: 24,
    backgroundColor: 'purple',
    marginRight: 16
  }
});

export default SearchModal;
