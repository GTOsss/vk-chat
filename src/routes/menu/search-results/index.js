import React from 'react'
import SearchResultsComponent from '../../../components/blocks/search-results'
import {connect} from 'react-redux'

class SearchResults extends React.Component {
  render() {
    return (
      <SearchResultsComponent {...this.props}/>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.searchResults.searchResults,
  groups: state.searchResults.groups,
  groupsCount: state.searchResults.groupsCount,
  step: state.searchResults.step,
  searchParams: state.searchResults.searchParams,
  progressGroup: state.searchResults.progressGroup
});

export default connect(mapStateToProps)(SearchResults)