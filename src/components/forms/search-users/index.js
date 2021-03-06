import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import cx from 'classnames';
import PropTypes from 'prop-types';
import * as searchFormActions from '../../../store/actions/search-form';
import { RadioGroupSex, SelectAgeTo, SelectAgeFrom, SelectCity, SelectCountry } from './inputs';
import Button from '../inputs/button';
import Checkbox from '../inputs/checkbox';

import style from './search-form.scss';

class FormClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isUpdateCountries: false };
  }

  componentWillReceiveProps(willProps) {
    if ((this.props.countries.length === willProps.countries.length)
      && this.state.isUpdateCountries) {
      this.setState({ isUpdateCountries: false });
    }

    if (this.props.countries.length !== willProps.countries.length) {
      this.setState({ isUpdateCountries: true });
    }
  }

  render() {
    const { handleSubmit, isHideAdditional, ageFrom, ageTo, sex, country,
      updateCountries, countries, isLoadingCountries,
      updateCities, city, deepSearch, isBtnSearchDisable } = this.props;
    return (
      <form onSubmit={handleSubmit} className={style['search-screen']}>
        <label className={style.label} htmlFor="country">Регион</label>
        <div className={style.input}>
          <Field
            name="country"
            component={props => (<SelectCountry
              {...props} value={country}
              isLoad={isLoadingCountries}
              isFocus={this.state.isUpdateCountries}
              countries={countries} onFocus={updateCountries}
            />)}
          />
        </div>
        { country &&
        <div className={style.input}>
          <Field
            name="city" component={props => (<SelectCity
              {...props} loadOptions={updateCities}
              value={city}
            />)}
          />
        </div> }

        <label className={style.label} htmlFor="ageFrom">Возраст</label>
        <div className={cx(style.row, style['input-row'], style.input)}>
          <div className={style.row}>
            <Field
              name="ageFrom"
              component={props => <SelectAgeFrom {...props} value={ageFrom} ageTo={ageTo} />}
            />
            <div>&nbsp;-&nbsp;</div>
            <Field
              name="ageTo"
              component={props => <SelectAgeTo {...props} value={ageTo} ageFrom={ageFrom} />}
            />
          </div>
        </div>

        <label className={style.label} htmlFor="sex">Пол</label>
        <div>
          <Field name="sex" component={props => <RadioGroupSex {...props} currentValue={sex} />} />
        </div>

        {!isHideAdditional
          ? <div>
            <label className={style.label} htmlFor="deepSearch">Дополнительно</label>
            <Field
              name="deepSearch"
              component={props => (<Checkbox {...props} color="#6786AB" size="18" active={deepSearch}>
                         Глубокий поиск
              </Checkbox>)}
            />
          </div>
          : '' }

        <Button type="submit" disabled={isBtnSearchDisable}>Поиск</Button>
      </form>
    );
  }
}

FormClass.propTypes = {
  isHideAdditional: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  deepSearch: PropTypes.bool,
  isBtnSearchDisable: PropTypes.bool,
  ageFrom: PropTypes.number,
  ageTo: PropTypes.number,
  country: PropTypes.number,
  sex: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateCountries: PropTypes.func.isRequired,
  updateCities: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.any),
  city: PropTypes.objectOf(PropTypes.any),
};

FormClass.defaultProps = {
  isHideAdditional: false,
  isLoadingCountries: false,
  deepSearch: false,
  isBtnSearchDisable: false,
  ageFrom: null,
  ageTo: null,
  country: null,
  sex: null,
  city: null,
  countries: [],
};

const Form = reduxForm({ form: 'searchParams' })(FormClass);

const selector = formValueSelector('searchParams');
const mapStateToProps = (state) => {
  const { countries, isLoadingCountries } = state.searchForm;
  const {
    ageTo,
    ageFrom,
    sex,
    country,
    city,
    deepSearch,
  } = selector(state, 'ageTo', 'ageFrom', 'sex', 'country', 'city', 'deepSearch');

  return {
    ageTo,
    ageFrom,
    sex,
    country,
    city,
    isLoadingCountries,
    countries,
    deepSearch,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(searchFormActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
