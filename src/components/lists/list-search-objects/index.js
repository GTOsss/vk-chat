import React from 'react'
import ItemSearchObject from './search-object-item'

import style from './list-search-objects.scss'

const createListSearchObjects = (searchObjects, iconClickHandler, modalToggle, headerClickHandler) =>
  searchObjects.map((el, i) => (
    <ItemSearchObject
      key={i}
      searchParams={el.searchParams}
      groups={el.groups}
      countResults={el.usersCount}
      active={el.isMarked}
      onClick={() => iconClickHandler(el.id)}
      headerClickHandler={() => headerClickHandler(el)}
      deleteOnClick={() => modalToggle(el.id)} />
));

const ListSearchObjects = ({searchObjects, iconClickHandler, modalToggle, headerClickHandler}) => (
  <div className={style['ul-screen']}>
    <ul className={style['ul-groups']}>
      {searchObjects && searchObjects.length
        ? createListSearchObjects(searchObjects, iconClickHandler, modalToggle, headerClickHandler)
        : <div className={style['text']}>
            <h5>Результаты поисков еще не были сохранены.</h5>
            <p>
              Здесь будет отображаться список результатов поиска если его сохранить. В сохраненных результатах
              так же можно произвести поиск или отфильтровать пользователей (как это делается в поиске по группам).
            </p>
          </div>}
    </ul>
  </div>
);

export default ListSearchObjects