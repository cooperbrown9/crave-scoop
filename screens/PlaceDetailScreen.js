import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import RoundButton from '../ui-elements/round-button.js';
import PlaceDetailItem from '../ui-elements/place-detail-item.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class PlaceDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Places'
  };

  static propTypes = {
    model: React.PropTypes.object.isRequired
  };

  state = {
    titty: 'cool dude'
  };


  _onPress = () => {
    // console.log(this.props);
    this.setState({titty: ''})
  };

  _getHoursForDay() {
    const today = todayHours = this.props.model.hours[new Date().getDay()];
    let todayHours = today.open + today.open_tod + ' - ' + today.close + today.close_tod;

    return todayHours;
  };

  componentDidMount() {
    // console.log(this.props);
  }

  render() {

    return(
      <ScrollView style={styles.ScrollContainer} >
        <View style={styles.topContainer} >

          <View style={styles.topView_Image} >
            <Image style={styles.topImage} source={require('../assets/images/fake-bg.png')}></Image>
          </View>

          <View style={styles.infoContainer} >
            <TouchableOpacity onPress={this._onPress} >
            <Text style={styles.infoTitle}>{this.props.model.name}</Text>
            </TouchableOpacity>
            <View style={styles.resturantInfoContainer} >
              <View style={styles.resturantInfoContainer_Hours}>
                <View style={{marginRight: 8}} >
                  <Image style={{height:16, width: 16}} source={require('../assets/images/clock.png')}></Image>
                </View>
                <Text style={{fontSize: 16, color: 'grey'}}>{this._getHoursForDay()}</Text>
              </View>

              <View style={styles.resturantInfoContainer_Addy}>
                <View style={{marginRight: 8}} >
                  <Image style={{height:16, width: 16}} source={require('../assets/images/pin.png')}></Image>
                </View>
                <Text style={{fontSize: 16, color: 'grey'}}>{this.props.model.location.address}</Text>
              </View>
            </View>

            <Text style={styles.restaurantDescription}>{this.props.model.description}</Text>

          </View>

        </View>

        <View style={styles.menuContainer}>

          {this.props.model.products.map(product => <PlaceDetailItem name={product.name} description={product.description} /> )}
          
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  topContainer : {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topView_Image: {
    flex: 1
  },
  topImage: {
    height: 180
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  infoTitle: {
    fontSize: 20,
    marginTop: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  resturantInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 20,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16
  },
  resturantInfoContainer_Hours: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  resturantInfoContainer_Addy: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10
  },
  restaurantDescription: {
    flex: 1,
    fontSize: 16,
    lineHeight: 0,
    marginLeft: 16,
    marginRight: 16,
    textAlign: 'center',
    marginTop: 16
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'stretch',
    marginTop: 16,
  },
});

var mapStateToProps = (state) => {
  return {
    name: state.nav.name,
    description: state.nav.description,
    model: state.nav.model
  }
}

export default connect(mapStateToProps)(PlaceDetailScreen);
