import React from 'react'
import ItemSearchObject from './search-object-item'

import style from './list-search-objects.scss'

const createListSearchObjects = (searchObjects, iconClickHandler) => searchObjects.map((el, i) => (
  <ItemSearchObject
    key={i}
    searchParams={el.searchParams}
    groups={el.groups}
    countResults={el.users.length}
    active={el.isMarked}
    onClick={() => iconClickHandler(el.id)} />
));

const ListSearchObjects = ({searchObjects, iconClickHandler}) => (
  <div className={style['ul-screen']}>
    <ul className={style['ul-groups']}>
      {searchObjects && searchObjects.length
        ? createListSearchObjects(searchObjects, iconClickHandler)
        : <div className={style['text']}>
              Резульаты поисков еще не были сохранены
          </div>}
    </ul>
  </div>
);

export default ListSearchObjects