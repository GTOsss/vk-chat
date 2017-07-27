import React from 'react'
import GroupComponent from '../components/groups'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as usersAction from '../../../actions/user'

class Groups extends React.Component {

  componentDidMount() {
    this.props.updateGroups(this.props.vkInfo.viewerId);
  }

  render() {
    console.log(this.props.groups[1]);
    return (
      <GroupComponent groups={this.props.groups} />
    )
  }
}

const mapStateToProps = (state, props) => ({
  vkInfo: props.route.vkInfo,
  groups: state.user.groups
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(usersAction, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Groups)