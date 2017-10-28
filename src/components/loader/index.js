import React from 'react';
import LoaderIcon from 'react-icons/lib/fa/refresh';
import PropTypes from 'prop-types';

import style from './loader.scss';

const Loader = ({ size, mini }) => (
  <div
    className={style['wrap-loader']}
    style={mini ? { lineHeight: '80px', marginTop: '-15px' } : {}}
  >
    <LoaderIcon className={style.icon} color="#507299" size={mini ? 24 : size} />
  </div>
);

Loader.propTypes = {
  size: PropTypes.number,
  mini: PropTypes.bool,
};

Loader.defaultProps = {
  size: 56,
  mini: false,
};

export default Loader;
