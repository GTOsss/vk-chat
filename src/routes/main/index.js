import React from 'react'
import * as userActions from '../../store/actions/user'
import MainComponent from './components/main'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class Main extends React.Component {
  componentDidMount() {
    this.props.getVkInfo();
  }

  render() {
    return (
      <MainComponent {...this.props} />
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(userActions, dispatch);

export default connect(null, mapDispatchToProps)(Main)