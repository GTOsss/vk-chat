import React from 'react';
import PropTypes from 'prop-types';

import style from './error-message.scss';

const ErrorMessage = ({ error }) => (
  <span className={style['error-message']}>{error}</span>
);

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorMessage;
