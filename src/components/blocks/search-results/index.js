import React from 'react'
import ListUsers from './list-users'
import ProgressInfo from './progress-info'
import Loader from '../../../components/loader'
import {connect} from 'react-redux'

import style from './search-results.scss'

const SearchResults = ({users, groupsCount, step, progressGroup, setRefList, loadingSlice, currentMembersCount,
                         groups, searchParams, onScroll, usersCount, noSearch, isSearchSO}) => (
  <div className={style['wrap-scroll']} onScroll={onScroll}>
    <div className='container-fluid'>
      <div className='row' ref={setRefList}>
        <div className={'col-md-10 offset-1'}>
          {noSearch && loadingSlice ? <Loader/> : ''}
          {(users && users.length)
            ?
              <div>
                <ListUsers users={users}
                           usersCount={usersCount}
                           groups={groups}
                           searchParams={searchParams}
                           noSearch={noSearch}
                           isSearchSO={isSearchSO}/>
                {loadingSlice ? <Loader mini/> : '' }
              </div>
            :  !noSearch ? <ProgressInfo count={groupsCount}
                              value={step}
                              progressGroup={progressGroup}
                              groups={groups}
                              searchParams={searchParams}
                              currentMembersCount={currentMembersCount}/> : '' }
          {(usersCount === 0 && step === groupsCount) && !noSearch
            ? <div className={style['text']}>Поиск не дал результатов.</div> : ''}
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  currentMembersCount: (state.searchResults.currentGroupSearch
    && state.searchResults.currentGroupSearch.members_count) || 0
});

export default connect(mapStateToProps)(SearchResults)