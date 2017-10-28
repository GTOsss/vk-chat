import React from 'react';
import PropTypes from 'prop-types';

import style from './search-params.scss';

const CreateTableParams = ({ city: cityArg, ageFrom, ageTo, sex, deepSearch }) => {
  const typeSearch = `${deepSearch ? 'Глубокий' : 'Обычный'}`;
  const city = cityArg && cityArg.label;
  let ageStr = `${!ageFrom ? '14' : ageFrom}-${!ageTo ? '80' : ageTo}`;
  ageStr = ageStr === '14-80' ? 'Любой' : ageStr;
  let sexStr;
  if (sex) {
    sexStr = (sex.toString() === '1' ? 'Женский' : '') || (sex.toString() === '1' ? 'Мужской' : '');
  } else { sexStr = ''; }
  sexStr = sexStr || 'Любой';
  const cityStr = city || 'Любой';
  return (
    <div className={style['search-info']}>
      <table className={style.table}>
        <tbody>
          <tr><td>Тип поиска:</td><td>{typeSearch}</td></tr>
          <tr><td>Город:</td><td>{cityStr}</td></tr>
          <tr><td>Пол:</td><td>{sexStr}</td></tr>
          <tr><td>Возвраст:</td><td>{ageStr}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

CreateTableParams.propTypes = {
  city: PropTypes.objectOf(PropTypes.any),
  ageFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ageTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deepSearch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

CreateTableParams.defaultProps = {
  city: null,
  ageFrom: '',
  ageTo: '',
  sex: '',
  deepSearch: false,
};

const HeaderListPanel = ({ searchParams }) => (
  <div>
    {<CreateTableParams {...searchParams} />}
  </div>
);

HeaderListPanel.propTypes = {
  searchParams: PropTypes.objectOf(PropTypes.any),
};

HeaderListPanel.defaultProps = {
  searchParams: {},
};

export default HeaderListPanel;
