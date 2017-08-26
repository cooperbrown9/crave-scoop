import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class DefaultScreen extends React.Component {

  state = {
    loading: true
  }


  render () {
    return (
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <Text>Default</Text>

          {this.state.loading ?
          <View style={{position: 'absolute', top: 0, left: 0, backgroundColor: 'white' }}>
            <ActivityIndicator animating={this.state.loading} size='large' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} />
          </View>
          : null }
      </View>
    )
  }
}

var mapStateToProps = state => {
  
}
