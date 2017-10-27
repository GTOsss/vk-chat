import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchComponent from './components/search';
import * as usersAction from '../../store/actions/user';
import * as searchResultsAction from '../../store/actions/search-results';

class Search extends React.PureComponent {
  static isBtnSearchDisable(groups) {
    for (let i = 0; i < groups.length; i += 1) {
      if (groups[i].isMarked) {
        return false;
      }
    }
    return true;
  }

  constructor(props) {
    super(props);
    this.onClickItemListHandler = this.onClickItemListHandler.bind(this);
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.refSetList = this.refSetList.bind(this);
    this.onScrollHandler = this.onScrollHandler.bind(this);
  }

  componentDidMount() {
    this.props.updateGroups(this.props.vkInfo.viewerId);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.groups.length !== this.props.groups.length) {
      this.load = false;
    }
  }

  onScrollHandler({ target }) {
    if (!this.load && (target.scrollTop + target.clientHeight + 100 >= this.list.clientHeight)) {
      this.props.loadSliceGroups(this.props.groups.length, 100);
      this.load = true;
    }
  }

  onClickItemListHandler(i) {
    this.props.markGroup(i);
  }

  onSubmitHandle(values) {
    const accessToken = this.props.vkInfo.accessToken;
    if (values.deepSearch) {
      this.props.deepSearchInGroups({ ...values, accessToken });
    } else {
      this.props.searchUsersInGroups({ ...values, accessToken });
    }

    this.props.router.push('/search/search-results');
  }

  refSetList(el) {
    this.list = el;
  }

  render() {
    const { groups, children, loadingObj } = this.props;
    return (
      <div>
        {children || <SearchComponent
          groups={groups}
          onClickItemListHandler={this.onClickItemListHandler}
          onClickItemHeaderListHandler={this.onClickItemListHandler}
          onSubmitHandle={this.onSubmitHandle}
          loading={loadingObj.groups}
          sliceLoading={loadingObj.sliceGroups}
          setRefList={this.refSetList}
          onScrollHandler={this.onScrollHandler}
          isBtnSearchDisable={Search.isBtnSearchDisable(groups)}
        />}
      </div>
    );
  }
}

Search.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.any, // eslint-disable-line
  loadingObj: PropTypes.objectOf(PropTypes.bool),
  router: PropTypes.objectOf(PropTypes.any),
  deepSearchInGroups: PropTypes.func.isRequired,
  searchUsersInGroups: PropTypes.func.isRequired,
  loadSliceGroups: PropTypes.func.isRequired,
  markGroup: PropTypes.func.isRequired,
  updateGroups: PropTypes.func.isRequired,
  vkInfo: PropTypes.objectOf(PropTypes.any),
};

Search.defaultProps = {
  groups: [],
  loadingObj: {},
  router: {},
  vkInfo: {},
};

const mapStateToProps = state => ({
  vkInfo: state.user.vkInfo,
  groups: state.user.groups,
  loadingObj: state.loading.loadingObj,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(usersAction, dispatch),
  ...bindActionCreators(searchResultsAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
