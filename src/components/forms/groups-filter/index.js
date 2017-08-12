import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import Input from '../inputs/input'
import cx from 'classnames'
import * as userActions from '../../../store/actions/user'

import style from './groups-filter.scss'

class Form extends React.Component {
  constructor(props){
    super(props);
  }

  onChangeFilter(e) {
    if(typeof e === 'string')
      this.props.groupsFilter(e);
    else
      this.props.groupsFilter(e.target.value)
  }

  render() {
    return (
      <form className={style['form']}>
        <Field name='filterText'
               component={(props) => <Input {...props}
                                            placeholder='Фильтр'
                                            onChange={(e) => this.onChangeFilter(e)}/>}/>
      </form>
    )
  }
}

Form = reduxForm({form: 'groupsFilter'})(Form);

const selector = formValueSelector('groupsFilter');
const mapStateToProps = (state) => {
  const filterText = selector(state, 'filterText');
  return {
    filterText
  }
};

const mapDispatchToProps = (dispatch) => (bindActionCreators(userActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Form);
