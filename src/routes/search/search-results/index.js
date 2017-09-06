import React from 'react'
import SearchResultsComponent from '../../../components/blocks/search-results'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as usersAction from '../../../store/actions/user'
import * as searchResultsAction from '../../../store/actions/search-results'

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.onScrollHandler = this.onScrollHandler.bind(this);
    this.setRefList = this.setRefList.bind(this);
  }

  setRefList(el) {
    this.list = el;
  }

  componentDidUpdate(previousProps) {
    if(previousProps.users.length !== this.props.users.length){
      this.load = false;
    }
  }

  onScrollHandler({target}) {
    if(!this.load && (target.scrollTop + target.clientHeight + 100 >= this.list.clientHeight)) {
      this.props.loadSliceUsers(this.props.users.length, 20);
      this.load = true;
    }
  }

  render() {
    return (
      <SearchResultsComponent {...this.props}
                              onScroll={this.onScrollHandler}
                              setRefList={this.setRefList}/>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    users: state.searchResults.users,
    usersCount: state.searchResults.searchResults.length,
    groups: state.user.groups,
    groupsCount: state.searchResults.groupsCount,
    step: state.searchResults.step,
    searchParams: state.searchResults.searchParams,
    progressGroup: state.searchResults.progressGroup,
    loadingSlice: state.loading.loadingObj.sliceUsers
  })
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(usersAction, dispatch),
  ...bindActionCreators(searchResultsAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)