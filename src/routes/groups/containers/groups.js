import React from 'react'
import GroupComponent from '../components/groups'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as usersAction from '../../../actions/user'

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.onClickItemListHandler = this.onClickItemListHandler.bind(this);
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
  }

  componentDidMount() {
    this.props.updateGroups(this.props.vkInfo.viewerId);
  }

  onClickItemListHandler(i) {
    this.props.markGroup(i);
  }

  onSubmitHandle(values) {
    const city = values.city ? values.city.value : null;
    const accessToken = this.props.vkInfo.accessToken;
    this.props.searchUsersInGroups({...values, city, accessToken});
  }

  render() {
    const {props: {groups}, onClickItemListHandler, onSubmitHandle} = this;
    return (
      <GroupComponent groups={groups}
                      onClickItemListHandler={onClickItemListHandler}
                      onSubmitHandle={onSubmitHandle}/>
    )
  }
}

const mapStateToProps = (state) => ({
  vkInfo: state.user.vkInfo,
  groups: state.user.groups
});

const mapDispatchToProps = (dispatch) => bindActionCreators(usersAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Groups)