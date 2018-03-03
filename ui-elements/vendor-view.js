import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import * as Colors from '../colors/colors.js';
import * as Keys from '../local-storage/keys.js';
import axios from 'react-native-axios';
import UserID from '../test-user/user.js';

export default class VendorView extends Component {

  static propTypes = {
    onTouch: PropTypes.func,
    model: PropTypes.object,
    userFavorites: PropTypes.array,
    updateUser: PropTypes.func
  }

  state = {
    active: false,
    wasLiked: false
  };

  componentDidMount() {
    for(let i = 0; i < this.props.userFavorites.length; i++) {
      if(this.props.userFavorites[i].vendor_id === this.props.model.id) {
        this.setState({ active: true, wasLiked: true });
      }
    }
  }

  _updateLikeCount = () => {
    let realLikes = this.props.model.like_count;
    if(this.state.active === true && this.state.wasLiked === false){
      realLikes += 1;
    }

   else if(this.state.active === false && this.state.wasLiked === true){
      realLikes -=1;
    }
    return realLikes;
  }

  _iconSwitch = () => {
    AsyncStorage.getItem(Keys.USER_ID, (err, id) => {
      AsyncStorage.getItem(Keys.SESSION_ID, (err, sessionID) => {
        let url = this.state.active ? 'https://crave-scoop.herokuapp.com/unfavorite/' + sessionID + '/' + id + '/' + this.props.model.id : 'https://crave-scoop.herokuapp.com/favorite/' + sessionID + '/' + id + '/' + this.props.model.id;
        axios.post(url).then(response => {
          this.state.active = !this.state.active;
          this.setState(this.state);
          this.props.updateUser();
        }).catch(error => {
          console.log('couldnt update like count');
        });
      });
    });
  }

  render() {
    const model = this.props.model;
    var icon = this.state.active ? require('../assets/images/black-heart.png') : require('../assets/images/heart.png');

    return(
      <View style={styles.container} >

        <TouchableOpacity onPress={this.props.onTouch} activeOpacity={0.7} style={styles.wrapper}>
          <View style={styles.imageContainer} >
            <Image style={styles.image} source={{uri: this.props.model.image}} />
          </View>

          <View style={styles.bottomView}>

            <Text style={styles.text}>{model.name}</Text>
            <Text style={styles.number}>{this._updateLikeCount()}</Text>

            <TouchableOpacity onPress={this._iconSwitch}>
              <Image style={styles.heart} source={icon}/>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'stretch',
    height: 180,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOffset: {width: 12, height: 12},
    shadowOpacity: 1.0,
    shadowRadius: 8,
  },
  wrapper: {
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'column',
    borderRadius: 4,
    alignItems: 'stretch'
  },
  imageContainer: {
    flex: 3,
    flexDirection: 'column',
    alignSelf: 'stretch'
  },
  image: {
    height: 160
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginTop: 10
  },
  text: {
    flex: 3,
    marginLeft: 16,
    fontWeight: '400',
    fontSize: 18,
    color: 'black',
    fontFamily: 'varela-round'
  },
  number: {
    fontSize: 14,
    width: 28,
    marginRight: 8,
    color: Colors.LIGHT_GREY,
    textAlign: 'right'
  },
  heart: {
    marginRight: 16,
    height: 24,
    width: 24,
    tintColor: Colors.DARK_BLUE
  },
});
