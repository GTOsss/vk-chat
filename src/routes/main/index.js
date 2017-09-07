import React from 'react'
import * as userActions from '../../store/actions/user'
import MainComponent from './components/main'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class Main extends React.Component {
  componentWillMount() {
    this.props.init();
  }

  render() {
    return (
      <MainComponent {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main)