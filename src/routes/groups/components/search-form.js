import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm, formValueSelector, formValues} from 'redux-form'
import Select from '../../../components/forms/select'
import {RadioButton, RadioGroup} from '../../../components/forms/radio-input'
import cx from 'classnames'
import {createAgeOptions} from '../helper/select-options'

import style from './groups.scss'

const SelectAgeFrom = (props) => (
  <Select {...props} options={createAgeOptions(14, props.ageTo || 80, 'от ', 'От')}
          placeholder='От' className={style['input-age']}/>
);

const SelectAgeTo = (props) => (
  <Select {...props} options={createAgeOptions(props.ageFrom || 14, 80, 'до ', 'До')}
          placeholder='До' className={style['input-age']}/>
);

const RadioGroupSex = (props) => (
  <RadioGroup {...props} className={style['radio-group']}>
    <RadioButton value={'2'}>Мужской</RadioButton>
    <RadioButton value={'1'}>Женский</RadioButton>
    <RadioButton value={'0'}>Любой</RadioButton>
  </RadioGroup>
);

let Form = ({handleSubmit, ageFrom, ageTo, sex}) => (
  <form onSubmit={handleSubmit}>
    <div className={cx(style['row'], style['input-row'])}>
      <label className={style['label']}>Возраст</label>
      <div className={style['row']}>
        <Field name='ageFrom'
               component={(props)=> <SelectAgeFrom {...props} value={ageFrom} ageTo={ageTo}/> }/>
        <div>&nbsp;-&nbsp;</div>
        <Field name='ageTo'
               component={(props)=> <SelectAgeTo {...props} value={ageTo} ageFrom={ageFrom}/> }/>
      </div>
    </div>
    <div className={cx(style['row'], style['input-row'])}>
      <label className={style['label']}>Пол</label>
      <Field name='sex' component={(props)=> <RadioGroupSex {...props} currentValue={sex}/> }/>
    </div>
    <button type='submit'>Submit</button>
  </form>
);

Form = reduxForm({form: 'searchParams'})(Form);

const selector = formValueSelector('searchParams');
Form = connect(state => {
  const {ageTo, ageFrom, sex} = selector(state, 'ageTo', 'ageFrom', 'sex');
  return {ageTo, ageFrom, sex}
})(Form);



export default Form;