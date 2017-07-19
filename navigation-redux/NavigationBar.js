import React from 'react';

// Navigation
import { addNavigationHelpers } from 'react-navigation';
import { NavBar } from './NavBar.js';

//Redux
import { connect } from 'react-redux';

const mapStateToProps = state => {
 return {
  navigationState: state.navBar,
  }
}

class MainStackNavigation extends React.Component {
  render() {
    // const { dispatch, navigationState } = this.props;

    return(
      <NavBar />
      // <NavBar navigation={addNavigationHelpers({dispatch: dispatch, state: navigationState})} />
    )
  }
}

export default connect(mapStateToProps)(MainStackNavigation)
