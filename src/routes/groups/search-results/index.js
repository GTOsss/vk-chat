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
    const {props: {users, groupsCount, step}} = this;
    return (
      <SearchResultsComponent users={users}
                              groupsCount={groupsCount}
                              step={step} />
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.searchResults.searchResults,
  groupsCount: state.searchResults.groupsCount,
  step: state.searchResults.step
});

const mapDispatchToProps = (dispatch) => bindActionCreators(usersAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)