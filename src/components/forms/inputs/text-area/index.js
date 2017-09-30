import React from 'react'
import Textarea from 'react-textarea-autosize'
import cx from 'classnames'

import style from './text-area.scss'

class TextArea extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };

    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onBlurHandler({target: {value}}) {
    this.props.input.onChange(value);
  }

  onChangeHandler({target: {value}}) {
    this.setState({'inputValue': value});
  }


  clearInput() {
    this.props.input.onChange('');
    this.setState({
      inputValue: ''
    })
  }

  render() {
    const {input: {value}, placeholder, isClearBtn, cssWrap} = this.props;
    if (this.didMount) {
      this.input.textContent = value;
      this.didMount = false;
    }

    return (
      <div className={style['wrap-input']} style={cssWrap}>
        <Textarea className={cx(style['input'], style['scroll'])}
                  defaultValue={value}
                  placeholder={placeholder}
                  onChange={this.onChangeHandler}
                  onBlur={this.onBlurHandler}
                  minRows={1}
                  maxRows={4}/>
        {!this.state.inputValue && isClearBtn ?
          <div className={style['clear-btn']}
               onClick={this.clearInput}>
            ×
          </div> : ''}
      </div>
    );
  }
}

export default TextArea