import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChatComponent from './components/chat';
import * as usersAction from '../../store/actions/user';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onClickItemListHandler = this.onClickItemListHandler.bind(this);
    this.refSetList = this.refSetList.bind(this);
    this.onScrollHandler = this.onScrollHandler.bind(this);
    this.onClickItemConnectHandler = this.onClickItemConnectHandler.bind(this);
  }

  componentDidMount() {
    this.props.actions.updateGroups(this.props.vkInfo.viewerId);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.groups.length !== this.props.groups.length) {
      this.load = false;
    }
  }

  onScrollHandler({ target }) {
    if (!this.load && (target.scrollTop + target.clientHeight + 100 >= this.list.clientHeight)) {
      this.props.actions.loadSliceGroups(this.props.groups.length, 100);
      this.load = true;
    }
  }

  onClickItemListHandler(id) {
    this.props.actions.selectGroup(id);
  }

  onClickItemConnectHandler(id) {
    this.props.actions.connectGroupToggle(id);
  }

  refSetList(el) {
    this.list = el;
  }

  render() {
    const { groups, children, loadingObj } = this.props;
    return (
      <div>
        {children || <ChatComponent
          groups={groups}
          onClickItemListHandler={this.onClickItemListHandler}
          loading={loadingObj.groups}
          sliceLoading={loadingObj.sliceGroups}
          setRefList={this.refSetList}
          onScrollHandler={this.onScrollHandler}
          onClickItemConnectHandler={this.onClickItemConnectHandler}
        />}
      </div>
    );
  }
}

Search.propTypes = {
  actions: PropTypes.objectOf(PropTypes.any).isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingObj: PropTypes.objectOf(PropTypes.any).isRequired,
  vkInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.element,
};

Search.defaultProps = {
  children: null,
};

const mapStateToProps = state => ({
  vkInfo: state.user.vkInfo,
  groups: state.user.groups,
  loadingObj: state.loading.loadingObj,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(usersAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
