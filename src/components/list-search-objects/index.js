import React from 'react'
import ItemSearchObject from './search-object-item'

import style from './list-search-objects.scss'

const createListSearchObjects = (searchObjects, iconClickHandler) => {
  let items = [];
  for (let i = 0; i < Math.min(20, searchObjects.length); i++) {
    let el = searchObjects[i];
    items.push(
      <ItemSearchObject
        key={i}
        searchParams={el.searchParams}
        groups={el.groups}
        countResults={el.usersCount}
        active={el.isMarked}
        onClick={() => iconClickHandler(el.id)} />
    )
  }
  return items;
};

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