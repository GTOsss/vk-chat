import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import cx from 'classnames'
import * as searchFormActions from '../../../actions/search-form'
import {RadioGroupSex, SelectAgeTo, SelectAgeFrom, SelectCity, SelectCountry} from './inputs'

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {isUpdateCountries: false}
  }

  componentDidUpdate(prevProps){
    if(this.props.countries.length !== prevProps.countries.length){
      this.setState({isUpdateCountries: true});
    }
  }

  componentWillUpdate(willProps) {
    if ((this.props.countries.length === willProps.countries.length) && this.state.isUpdateCountries) {
      this.setState({isUpdateCountries: false});
    }
  }

  render() {
    const {handleSubmit, ageFrom, ageTo, sex, country, updateCountries, countries, isLoadingCountries,
      updateCities, city} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <label className={style['label']}>Регион</label>
        <div className={style['input']}>
          <Field name='country'
                 component={(props)=> <SelectCountry {...props} value={country}
                                                     isLoad={isLoadingCountries}
                                                     isFocus={this.state.isUpdateCountries}
                                                     countries={countries} onFocus={updateCountries}/>}/>
        </div>
        { country &&
          <div className={style['input']}>
            <Field name='city' component={(props)=> <SelectCity {...props} loadOptions={updateCities}
                                                                value={city}/>}/>
          </div> }
        <div className={style['input']}>

        </div>
        <label className={style['label']}>Возраст</label>
        <div className={cx(style['row'], style['input-row'], style['input'])}>
          <div className={style['row']}>
            <Field name='ageFrom'
                   component={(props)=> <SelectAgeFrom {...props} value={ageFrom} ageTo={ageTo}/> }/>
            <div>&nbsp;-&nbsp;</div>
            <Field name='ageTo'
                   component={(props)=> <SelectAgeTo {...props} value={ageTo} ageFrom={ageFrom}/> }/>
          </div>
        </div>

        <label className={style['label']}>Пол</label>
        <div>
          <Field name='sex' component={(props)=> <RadioGroupSex {...props} currentValue={sex}/> }/>
        </div>

        <button type='submit'>Submit</button>
      </form>
    )
  }
}

import style from './search-form.scss'

Form = reduxForm({form: 'searchParams'})(Form);

const selector = formValueSelector('searchParams');
const mapStateToProps = (state) => {
  const {countries, isLoadingCountries} = state.searchForm;
  const {ageTo, ageFrom, sex, country, city} = selector(state, 'ageTo', 'ageFrom', 'sex', 'country', 'city');
  return {
    ageTo,
    ageFrom,
    sex,
    country,
    city,
    isLoadingCountries,
    countries
  }
};

const mapDispatchToProps = (dispatch) => (bindActionCreators(searchFormActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Form);
