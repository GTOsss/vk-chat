import React from 'react'
import ListUsers from './list-users'
import ProgressInfo from './progress-info'

import style from './search-results.scss'

const SearchResults = ({users, groupsCount, step, progressGroup, groups}) => (
  <div className={style['wrap-scroll']}>
    <div className='container-fluid'>
      <div className='row'>
        <div className={'col-md-10 offset-1'}>
          { (users && users.length)
            ? <ListUsers users={users} groups={groups}/>
            : <ProgressInfo count={groupsCount} value={step} progressGroup={progressGroup} groups={groups}/> }

          { (users && users.length === 0 && step === groupsCount)
            ? <div className={style['text']}>Поиск не дал результатов.</div> : '' }
        </div>
      </div>
    </div>
  </div>
);

export default SearchResults