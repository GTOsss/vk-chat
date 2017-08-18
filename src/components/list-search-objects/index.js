import React from 'react'
import ItemSearchObject from './search-object-item'

import style from './list-search-objects.scss'

const createListSearchObjects = (searchObjects) => searchObjects.map((el, i) => (
  <ItemSearchObject
    key={i}
    searchParams={el.searchParams}
    groups={el.groups}
    countResults={el.users.length} />
));

const ListSearchObjects = ({searchObjects}) => (
  <div className={style['ul-screen']}>
    <ul className={style['ul-groups']}>
      {searchObjects && searchObjects.length
        ? createListSearchObjects(searchObjects)
        : <div className={style['text']}>
              Резульаты поисков еще не были сохранены
          </div>}
    </ul>
  </div>
);

export default ListSearchObjects