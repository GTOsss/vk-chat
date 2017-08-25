import React from 'react'
import ListUsers from './list-users'
import ProgressInfo from './progress-info'
import Loader from '../../../components/loader'

import style from './search-results.scss'

const SearchResults = ({users, groupsCount, step, progressGroup, setRefList, loadingSlice,
                         groups, searchParams, onScroll, setRefLis, usersCount}) => (
  <div className={style['wrap-scroll']} onScroll={onScroll}>
    <div className='container-fluid'>
      <div className='row' ref={setRefList}>
        <div className={'col-md-10 offset-1'}>
          {(users && users.length)
            ?
              <div>
                <ListUsers users={users} usersCount={usersCount} groups={groups} searchParams={searchParams}/>
                <Loader mini/>
              </div>
            : <ProgressInfo count={groupsCount}
                            value={step}
                            progressGroup={progressGroup}
                            groups={groups}
                            searchParams={searchParams}/>}
          {(usersCount === 0 && step === groupsCount)
            ? <div className={style['text']}>Поиск не дал результатов.</div> : ''}
        </div>
      </div>
    </div>
  </div>
);

export default SearchResults