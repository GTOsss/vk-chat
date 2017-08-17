import React from 'react'

import style from './search-params.scss'

const createTableParams = ({city, ageFrom, ageTo, sex, deepSearch}) => {
  let typeSearch = `${deepSearch ? 'Глубокий' : 'Обычный'}`;
  city = city && city.label;
  let ageStr = `${!ageFrom ? '14' : ageFrom}-${!ageTo ? '80' : ageTo}`;
  ageStr = (ageStr === '14-80' ? 'Любой' : ageStr);
  let sexStr;
  if(sex)
    sexStr = (sex.toString() === '1' ? 'Женский' : '') || (sex.toString() === '1' ? 'Мужской' : '');
  else
    sexStr = '';
  sexStr = sexStr || 'Любой';
  let cityStr = city || 'Любой';
  return (
    <div className={style['search-info']}>
      <table className={style['table']}>
        <tbody>
          <tr><td>Тип поиска:</td><td>{typeSearch}</td></tr>
          <tr><td>Город:</td><td>{cityStr}</td></tr>
          <tr><td>Пол:</td><td>{sexStr}</td></tr>
          <tr><td>Возвраст:</td><td>{ageStr}</td></tr>
        </tbody>
      </table>
    </div>
  )
};

const HeaderListPanel = ({searchParams}) => (
  <div>
    {createTableParams(searchParams)}
  </div>
);

export default HeaderListPanel