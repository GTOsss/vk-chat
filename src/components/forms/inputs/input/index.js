import React from 'react'
import ErrorMessage from '../error-message'

import style from './input.scss'

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: ''};
  }

  onChangeHandler(e, onChange) {
    onChange(e);
    this.setState({input: e.target.value});
  }

  onClickClearHandler(input, onChange) {
    onChange('');
    input.onChange('');
    this.refs.input.value = '';
    this.setState({input: ''});
  }

  render() {
    const {input, meta, placeholder, onChange} = this.props;
    return (
      <div className={style['wrap-input']}>
        <input className={style['input']}
               onChange={(e) => this.onChangeHandler(e, onChange)}
               type='text'
               ref='input'
               placeholder={placeholder}/>
        {(this.state.input !== '')
          ? <div className={style['clear-btn']}
                 onClick={() => this.onClickClearHandler(input, onChange)}>
            ×
          </div> : ''}
        {meta.touched && meta.error && <ErrorMessage error={meta.error}/>}
      </div>
    );
  }
}

export default Input