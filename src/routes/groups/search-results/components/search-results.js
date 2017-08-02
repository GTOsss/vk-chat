import React from 'react'
import ListUsers from '../../../../components/list-users/index'

import style from './search-results.scss'

const SearchResults = ({searchResults, groupsCount, step}) => (
  <div className={style['wrap-scroll']}>
    <div className='container-fluid'>
      <div className='row'>
        <div className={'col-md-6 offset-1'}>
          <div className={style['ul-screen']}>
            {searchResults ? searchResults.length : ''}
            <ListUsers users={searchResults}/>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SearchResults