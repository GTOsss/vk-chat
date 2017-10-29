import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

import './react-select.css';

class Select extends React.Component {
  componentDidMount() {
    if (this.props.isFocus) { this.select.focus(); }
  }

  render() {
    const { input: { onChange }, value, options, className, placeholder, isLoading, noResultsText,
      loadOptions, onFocus, searchPromptText, loadingPlaceholder } = this.props;
    return (
      loadOptions
        ? <ReactSelect.Async
          className={className}
          searchPromptText={searchPromptText}
          loadingPlaceholder={loadingPlaceholder}
          value={value}
          autoload={false}
          loadOptions={loadOptions}
          noResultsText={noResultsText}
          onChange={e => onChange(e || null)}
          placeholder={<span>{placeholder}</span>}
        />
        : <ReactSelect
          className={className}
          autoLoad
          openOnFocus
          ref={(e) => { this.select = e; }}
          value={value}
          isLoading={isLoading}
          noResultsText={noResultsText}
          options={options}
          onChange={e => onChange(e && e.value ? e.value : null)}
          onFocus={() => onFocus && onFocus()}
          placeholder={<span>{placeholder}</span>}
        />

    );
  }
}

Select.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  options: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  noResultsText: PropTypes.string,
  searchPromptText: PropTypes.string,
  loadingPlaceholder: PropTypes.string,
  isLoading: PropTypes.bool,
  isFocus: PropTypes.bool,
  loadOptions: PropTypes.func,
  onFocus: PropTypes.func,
};

Select.defaultProps = {
  input: {},
  value: '',
  options: [],
  className: '',
  placeholder: '',
  noResultsText: '',
  searchPromptText: '',
  loadingPlaceholder: '',
  isLoading: false,
  loadOptions: null,
  onFocus: null,
  isFocus: null,
};

export default Select;
