import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SearchResultsComponent from '../../../components/blocks/search-results';
import * as usersAction from '../../../store/actions/user';

class SearchResults extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onScrollHandler = this.onScrollHandler.bind(this);
    this.setRefList = this.setRefList.bind(this);
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
      />
    );
  }
}

SearchResults.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  countUsers: PropTypes.number,
};

SearchResults.defaultProps = {
  countUsers: 0,
};

const mapStateToProps = state => ({
  countUsers: state.searchResults.users.length,
  groups: state.user.groups,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(usersAction, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
