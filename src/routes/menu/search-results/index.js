import React from 'react'
import SearchResultsComponent from '../../../components/blocks/search-results'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as searchResultsActions from '../../../store/actions/search-results'

class SearchResults extends React.Component {
  constructor(props){
    super(props);
    this.setRefList = this.setRefList.bind(this);
    this.onScrollHandler = this.onScrollHandler.bind(this);
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
                              setRefList={this.setRefList} />
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.searchResults.users,
  usersCount: state.searchResults.searchResults.length,
  groups: state.searchResults.groups,
  groupsCount: state.searchResults.groupsCount,
  step: state.searchResults.step,
  searchParams: state.searchResults.searchParams,
  progressGroup: state.searchResults.progressGroup,
  loadingSlice: state.loading.loadingObj.sliceUsers,
  noSearch: state.searchResults.noSearch
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(searchResultsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)