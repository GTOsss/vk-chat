import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../error-message';

import style from './input.scss';

const Input = ({ input: { value, onChange: onChangeForm }, meta, placeholder, setRef,
  onChange }) =>
  (
    <div className={style['wrap-input']}>
      <input
        className={style.input}
        onBlur={e => onChangeForm && onChangeForm(e.target.value)}
        onChange={onChange}
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        ref={e => setRef && setRef(e)}
      />
      {value !== ''
        ? <div
          className={style['clear-btn']}
          onClick={() => onChange('')}
        >
        ×
        </div> : ''}
      {meta.touched && meta.error && <ErrorMessage error={meta.error} />}
    </div>
  );

Input.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  meta: PropTypes.objectOf(PropTypes.any),
  placeholder: PropTypes.string,
  setRef: PropTypes.func,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  input: {},
  meta: {},
  placeholder: '',
  setRef: null,
  onChange: null,
};

export default Input;
