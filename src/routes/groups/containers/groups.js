import React from 'react'
import GroupComponent from '../components/groups'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as usersAction from '../../../actions/user'

class Groups extends React.Component {
  constructor(props){
    super(props);
    this.onClickItemListHandler = this.onClickItemListHandler.bind(this);
  }

  componentDidMount() {
    this.props.updateGroups(this.props.vkInfo.viewerId);
  }

  onClickItemListHandler(i) {
    this.props.markGroup(i);
    console.log(this.props.groups);
  }

  render() {
    console.log(this.props.groups[1]);
    return (
      <GroupComponent groups={this.props.groups} onClickItemListHandler={this.onClickItemListHandler} />
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