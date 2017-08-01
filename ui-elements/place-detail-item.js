import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

const PlaceDetailItem = (props) => (

  <TouchableOpacity onPress={props.onPress} style={styles.container} >
      <View style={styles.imageContainer} >
        <Image style={styles.image} source={require('../assets/images/cupcake-photo.png')} />
      </View>

      <View style={styles.itemInfoContainer} >

        <View style={styles.nameView}>
          <Text style={styles.nameText}>{props.name}</Text>
        </View>

        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>{props.description}</Text>
        </View>

      </View>
  </TouchableOpacity>
);

PlaceDetailItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func
};

PlaceDetailItem.defaultProps = {
  name: 'Good Cake',
  description: 'yum yum yum yum yum yum yum yum yum yum yum yum yum yum yum yum yum yum'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 80,
    marginBottom: 16
  },

  imageContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16
  },
  itemInfoContainer: {
    flex: 3,
  },
  image: {
    height: null,
    width: null,
    flex: 1,
    resizeMode: 'stretch',
    borderRadius: 4
  },
  nameView: {
    marginTop: 8,
    marginRight: 32
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  descriptionView: {
    marginTop: 4,
    marginRight: 32
  },
  descriptionText: {
    fontSize: 10,
    color: 'black',
    lineHeight: 0
  }

});
 export default PlaceDetailItem;
