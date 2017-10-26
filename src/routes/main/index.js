import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../../store/actions/user';
import MainComponent from './components/main';

class Main extends React.Component {
  componentWillMount() {
    this.props.init();
  }

  render() {
    return (
      <MainComponent {...this.props} />
    );
  }
}

Main.propTypes = {
  init: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
