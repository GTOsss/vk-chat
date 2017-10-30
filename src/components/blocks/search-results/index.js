import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListUsers from './list-users';
import ProgressInfo from './progress-info';
import Loader from '../../../components/loader';

import style from './search-results.scss';

const SearchResults = ({ users, groupsCount, step, progressGroup, setRefList, loadingSlice,
  currentMembersCount, endSearch, groups, searchParams, onScroll, usersCount, noSearch,
  isSearchSO, actions }) =>
  (
    <div className={style['wrap-scroll']} onScroll={onScroll}>
      <div className="container-fluid">
        <div className="row" ref={setRefList}>
          <div className={'col-md-10 offset-1'}>
            {noSearch && loadingSlice ? <Loader /> : ''}
            {endSearch || noSearch ?
              <div>
                <ListUsers
                  users={users}
                  usersCount={usersCount}
                  groups={groups}
                  searchParams={searchParams}
                  noSearch={noSearch}
                  isSearchSO={isSearchSO}
                  progressFilter={progressGroup}
                />
                {loadingSlice ? <Loader mini /> : '' }
              </div>
              : ''}
            {!(endSearch || noSearch) && !noSearch ? <ProgressInfo
              count={groupsCount}
              value={step}
              progressGroup={progressGroup}
              groups={groups}
              searchParams={searchParams}
              currentMembersCount={currentMembersCount}
            /> : '' }
            {(usersCount === 0 && step === groupsCount)
            && !noSearch && endSearch && progressGroup === 100
              ? <div className={style.text}>Поиск не дал результатов.</div> : ''}
          </div>
        </div>
      </div>
    </div>
  );

SearchResults.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  groups: PropTypes.arrayOf(PropTypes.object),
  groupsCount: PropTypes.number,
  step: PropTypes.number,
  currentMembersCount: PropTypes.number,
  progressGroup: PropTypes.number,
  usersCount: PropTypes.number,
  setRefList: PropTypes.func,
  onScroll: PropTypes.func,
  loadingSlice: PropTypes.bool,
  isSearchSO: PropTypes.bool,
  endSearch: PropTypes.bool,
  noSearch: PropTypes.bool,
  searchParams: PropTypes.objectOf(PropTypes.any),
  actions: PropTypes.objectOf(PropTypes.func),
};

SearchResults.defaultProps = {
  users: [],
  groups: [],
  groupsCount: 0,
  step: 0,
  currentMembersCount: 0,
  progressGroup: 0,
  usersCount: 0,
  setRefList: null,
  onScroll: null,
  loadingSlice: false,
  isSearchSO: false,
  endSearch: false,
  noSearch: false,
  searchParams: {},
  actions: {},
};

const mapStateToProps = state => ({
  users: state.searchResults.users,
  endSearch: state.searchResults.endSearch,
  usersCount: state.searchResults.searchResults.length,
  groupsCount: state.searchResults.groupsCount,
  step: state.searchResults.step,
  searchParams: state.searchResults.searchParams,
  progressGroup: state.searchResults.progressGroup,
  loadingSlice: state.loading.loadingObj.sliceUsers,
  noSearch: state.searchResults.noSearch,
  currentMembersCount: (state.searchResults.currentGroupSearch
    && state.searchResults.currentGroupSearch.members_count) || 0,
});

export default connect(mapStateToProps)(SearchResults);
