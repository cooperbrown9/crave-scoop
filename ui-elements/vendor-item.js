import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import * as Colors from '../colors/colors.js';
import axios from 'react-native-axios';
import UserID from '../test-user/user.js';

export default class VendorItem extends Component {

  static propTypes = {
    onTouch: React.PropTypes.func,
    model: React.PropTypes.object,
    userFavorites: React.PropTypes.array
  }

  state = {
    active: false
  };

  componentDidMount() {
    for(let i = 0; i < this.props.userFavorites.length; i++) {
      if(this.props.userFavorites[i].restaurant_id === this.props.model.id) {
        this.setState({active: true});
      }
    }
  }


  _iconSwitch = () => {
    console.log(this.props.model.id);
    let url = 'https://crave-scoop.herokuapp.com/increment-likes/' + '59765d2df60c01001198f3b5/' + this.props.model.id;
    console.log('url ', url);
    axios.put(url).then(response => {
      this.state.active = !this.state.active;
      this.setState(this.state);
    }).catch(error => {
      console.log('couldnt update like count');
    });

  }

  render() {
    const model = this.props.model;
    var icon = this.state.active ? require('../assets/images/black-heart.png') : require('../assets/images/heart.png');
    return(
      <View style={styles.container} >

        <TouchableOpacity onPress={this.props.onTouch} style={styles.wrapper}>
          <View style={styles.imageContainer} >
            <Image style={styles.image} source={require('../assets/images/fake-bg.jpg')} />
          </View>

          <View style={styles.bottomView}>

            <Text style={styles.text}>{model.name}</Text>
            <Text style={styles.number}>{model.like_count}</Text>

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
    flex: 1,
    flexDirection: 'column',
    height: 180,
    backgroundColor: 'transparent',
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOffset: {width: 12, height: 12},
    shadowRadius: 8,
    shadowOpacity: 1.0,
  },
  wrapper: {
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'column',
    borderRadius: 4,
  },
  imageContainer: {
    flex: 3,
    flexDirection: 'column',
    marginRight: 16,
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
  text:{
    flex: 3,
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 18
  },
  number:{
    fontSize: 12,
    width: 32
  },
  heart:{
    marginRight: 16,
    height: 24,
    width: 24,
    tintColor: '#41d9f4'
  },
});
