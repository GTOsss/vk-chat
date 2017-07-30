import React from 'react'
import Select from '../../inputs/select/index'
import {RadioButton, RadioGroup} from '../../inputs/radio-input/index'
import {createAgeOptions} from '../../../../routes/groups/helper/select-options'

import style from '../search-form.scss'

const noResultsText = 'Ничего не найдено';
const textSelectCountry = 'Выбор страны';
const searchPromptText = 'Введите для поиска';
const textLoading = 'Загрузка...';

export const SelectAgeFrom = (props) => (
  <Select {...props} options={createAgeOptions(14, props.ageTo || 80, 'от ', 'От')}
          noResultsText={noResultsText} placeholder='От' className={style['input-age']}/>
);

export const SelectAgeTo = (props) => (
  <Select {...props} options={createAgeOptions(props.ageFrom || 14, 80, 'до ', 'До')}
          noResultsText={noResultsText} placeholder='До' className={style['input-age']}/>
);

export const RadioGroupSex = (props) => (
  <RadioGroup {...props}>
    <RadioButton value={'2'}>Мужской</RadioButton>
    <RadioButton value={'1'}>Женский</RadioButton>
    <RadioButton value={'0'}>Любой</RadioButton>
  </RadioGroup>
);

export const SelectCountry = (props) => (
  <Select {...props}
          options={[
            {label: props.isLoading ? textLoading : textSelectCountry},
            ...(props.countries ? props.countries : [])
          ]}
          isLoading={props.isLoad}
          onFocus={()=> props.onFocus && props.onFocus()}
          noResultsText={noResultsText}
          placeholder={textSelectCountry}
          className={style['input-region']} />
);

export const SelectCity = (props) => (
  <Select {...props}
          searchPromptText={searchPromptText}
          loadingPlaceholder={textLoading}
          placeholder='Выбор города'
          className={style['input-region']}
          noResultsText={noResultsText} />
);
