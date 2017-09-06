import React from 'react'
import SearchComponent from './components/search'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as usersAction from '../../store/actions/user'
import * as searchResultsAction from '../../store/actions/search-results'

class Search extends React.Component {
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
    if(previousProps.groups.length !== this.props.groups.length){
      this.load = false;
    }
  }

  onScrollHandler({target}) {
    if(!this.load && (target.scrollTop + target.clientHeight + 100 >= this.list.clientHeight)) {
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
      this.props.deepSearchInGroups({...values, accessToken});
    } else {
      this.props.searchUsersInGroups({...values, accessToken});
    }

    this.props.router.push('/search/search-results');
  }

  refSetList(el) {
    this.list = el;
  }

  isBtnSearchDisable(groups) {
    for(let i = 0; i < groups.length; i++) {
      if(groups[i].isMarked) {
        return false;
      }
    }
    return true;
  }

  render() {
    const {
      props: {groups, children, loadingObj},
      onClickItemListHandler,
      onSubmitHandle
    } = this;

    return (
      <div>
        {children ? children :
          <SearchComponent groups={groups}
                           onClickItemListHandler={onClickItemListHandler}
                           onClickItemHeaderListHandler={onClickItemListHandler}
                           onSubmitHandle={onSubmitHandle}
                           loading={loadingObj.groups}
                           sliceLoading={loadingObj.sliceGroups}
                           setRefList={this.refSetList}
                           onScrollHandler={this.onScrollHandler}
                           isBtnSearchDisable={this.isBtnSearchDisable(groups)}/>}
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
  ...bindActionCreators(usersAction, dispatch),
  ...bindActionCreators(searchResultsAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search)