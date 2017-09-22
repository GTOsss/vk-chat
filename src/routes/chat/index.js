import React from 'react'
import ChatComponent from './components/chat'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as usersAction from '../../store/actions/user'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onClickItemListHandler = this.onClickItemListHandler.bind(this);
    this.refSetList = this.refSetList.bind(this);
    this.onScrollHandler = this.onScrollHandler.bind(this);
    this.onClickItemConnectHandler = this.onClickItemConnectHandler.bind(this);
  }

  componentDidMount() {
    this.props.updateGroups(this.props.vkInfo.viewerId);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.groups.length !== this.props.groups.length) {
      this.load = false;
    }
  }

  onScrollHandler({target}) {
    if (!this.load && (target.scrollTop + target.clientHeight + 100 >= this.list.clientHeight)) {
      this.props.loadSliceGroups(this.props.groups.length, 100);
      this.load = true;
    }
  }

  onClickItemListHandler(id) {
    this.props.selectGroup(id);
  }

  onClickItemConnectHandler(id) {
    this.props.connectGroupToggle(id);
  }

  refSetList(el) {
    this.list = el;
  }

  render() {
    const {groups, children, loadingObj} = this.props;
    return (
      <div>
        {children ? children :
          <ChatComponent groups={groups}
                         onClickItemListHandler={this.onClickItemListHandler}
                         loading={loadingObj.groups}
                         sliceLoading={loadingObj.sliceGroups}
                         setRefList={this.refSetList}
                         onScrollHandler={this.onScrollHandler}
                         onClickItemConnectHandler={this.onClickItemConnectHandler}/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  vkInfo: state.user.vkInfo,
  groups: state.user.groups,
  loadingObj: state.loading.loadingObj
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(usersAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search)