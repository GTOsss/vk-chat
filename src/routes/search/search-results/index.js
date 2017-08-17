import React from 'react'
import SearchResultsComponent from './components/search-results'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as usersAction from '../../../store/actions/user'

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {props: {users, groupsCount, step, progressGroup, groups, searchParams}} = this;
    return (
      <SearchResultsComponent users={users}
                              groupsCount={groupsCount}
                              step={step}
                              groups={groups}
                              progressGroup={progressGroup}
                              searchParams={searchParams} />
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.searchResults.searchResults,
  groups: state.user.groups,
  groupsCount: state.searchResults.groupsCount,
  step: state.searchResults.step,
  searchParams: state.searchResults.searchParams,
  progressGroup: state.searchResults.progressGroup
});

const mapDispatchToProps = (dispatch) => bindActionCreators(usersAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)