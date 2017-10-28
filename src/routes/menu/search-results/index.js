import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SearchResultsComponent from '../../../components/blocks/search-results';
import * as userActions from '../../../store/actions/user';
import * as searchResultsActions from '../../../store/actions/search-results';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.setRefList = this.setRefList.bind(this);
    this.onScrollHandler = this.onScrollHandler.bind(this);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.countUsers !== this.props.countUsers) {
      this.load = false;
    }
  }

  onScrollHandler({ target }) {
    if (!this.load && (target.scrollTop + target.clientHeight + 100 >= this.list.clientHeight)) {
      this.props.actions.loadSliceUsers(this.props.countUsers, 20);
      this.load = true;
    }
  }

  setRefList(el) {
    this.list = el;
  }

  render() {
    return (
      <SearchResultsComponent
        {...this.props}
        onScroll={this.onScrollHandler}
        setRefList={this.setRefList}
        isSearchSO
      />
    );
  }
}

SearchResults.propTypes = {
  countUsers: PropTypes.number,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

SearchResults.defaultProps = {
  countUsers: 0,
};

const mapStateToProps = state => ({
  countUsers: state.searchResults.users.length,
  groups: state.searchResults.groups,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(userActions, dispatch),
    ...bindActionCreators(searchResultsActions, dispatch),
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
