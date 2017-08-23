import React from 'react'
import SearchResultsComponent from '../../../components/blocks/search-results'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as usersAction from '../../../store/actions/user'

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SearchResultsComponent {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    users: state.searchResults.searchResults,
    groups: state.user.groups,
    groupsCount: state.searchResults.groupsCount,
    step: state.searchResults.step,
    searchParams: state.searchResults.searchParams,
    progressGroup: state.searchResults.progressGroup,
  })
};

const mapDispatchToProps = (dispatch) => bindActionCreators(usersAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)