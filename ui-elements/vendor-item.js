import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import * as Colors from '../colors/colors.js';

export default class VendorItem extends Component {

  static propTypes = {
    onTouch: React.PropTypes.func,
    model: React.PropTypes.object
  }

  state = {
    text: 'Francescas Cakes',
    active: false
  };


  _iconSwitch = () => {
    this.state.active = !this.state.active;
    this.setState(this.state);
  }

  render() {
    const model = this.props.model;
<<<<<<< HEAD
    var icon = this.state.active ? require('../assets/images/heart.png') : require('../assets/images/right-arrow.png');
=======
    var icon = this.state.active ? require('../assets/images/black-heart.png') : require('../assets/images/heart.png');
>>>>>>> b5eb0e89a9131783511ecfd2b5d25c1c3d058f24

    return(
      <View style={styles.container} >
        <TouchableOpacity onPress={this.props.onTouch} style={styles.wrapper}>
          <View style={styles.imageContainer} >
            <Image style={styles.image} source={require('../assets/images/fake-bg.jpg')} />
          </View>

          <View style={styles.bottomView}>
            <Text style={styles.text}>{model.name}</Text>
            <Text style={styles.number}>{model.likeCount}</Text>
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
    height: 160,
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
    fontWeight: 'bold'
  },
  number:{
    fontSize: 10,
    width: 24
  },
  heart:{
    marginRight: 16,
    height: 16,
    width: 16,
    tintColor: 'blue'
  },
});
