import React from 'react'
import SearchResultsComponent from './components/search-results'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as usersAction from '../../../actions/user'

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {props: {users, groupsCount, step, progressGroup}} = this;
    return (
      <SearchResultsComponent users={users}
                              groupsCount={groupsCount}
                              step={step}
                              progressGroup={progressGroup} />
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.searchResults.searchResults,
  groupsCount: state.searchResults.groupsCount,
  step: state.searchResults.step,
  progressGroup: state.searchResults.progressGroup
});

const mapDispatchToProps = (dispatch) => bindActionCreators(usersAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)