import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import MarkCircle from 'react-icons/lib/fa/check-circle-o';
import ConnectInfo from '../../icons/connect-info';
import MessageInfo from './message-info';

import style from './list-groups.scss';

class GroupItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    if (this.props.onClick) { this.props.onClick(this.props.id); }
  }

  render() {
    const { title, text, srcImg50, online, isMarked, isSelect, minimize,
      showMarked, isChat, countMsg, countMsgPrivate } = this.props;

    let cssPaddingItem;
    if (minimize) {
      cssPaddingItem = isSelect ? '5px 4px' : '7px 4px';
    } else {
      cssPaddingItem = isSelect ? '10px 2px 10px 12px' : '12px 2px 12px 12px';
    }

    return (
      <li
        className={minimize
          ? cx(style['group-item-minimize'], isSelect ? style['group-item-minimize-active'] : '')
          : cx(style['group-item'], isSelect ? style['group-item-active'] : '')}
        onClick={this.onClickHandler}
        style={{
          //  transition: '300ms linear 0s',
          //  transitionProperty: 'height, width',
          height: minimize ? '51px' : '74px',
          padding: cssPaddingItem,
        }}
      >
        <div>
          <img
            src={srcImg50}
            alt={'загрузка...'}
            // style={{transition: 'height 300ms linear 0s, width'}}
            className={minimize ? style['group-photo-minimize'] : style['group-photo']}
          />
        </div>

        <div
          style={{
          //   transition: 'opacity 200ms linear',
          //   transitionDelay: !listConnectsMinimize ? '0ms' : '700ms',
            position: minimize ? 'absolute' : 'static',
            opacity: minimize ? 0 : 1,
            width: minimize ? '130px' : 'auto',
            overflow: 'hidden',
          }}
        >
          <div className={style['group-title']}>{title}</div>
          <div className={style['group-text']}>{text}</div>
        </div>

        <div
          className={style['wrap-massage-info']}
          style={{
          //   transition: 'opacity 200ms linear 0s',
          //   opacity: listConnectsMinimize ? 1 : 0,
            visibility: isChat ? 'visible' : 'hidden',
            //   transitionDelay: listConnectsMinimize ? '0ms' : '700ms',
            position: minimize && isChat ? 'static' : 'absolute',
            height: 'inherit',
          }}
        >
          <MessageInfo count={countMsg} color={'#484848'} />
          <MessageInfo count={countMsgPrivate} color={'#006800'} />
        </div>

        <div
          style={{
          //   transition: 'opacity 200ms linear 0s',
          //   opacity: minimize ? 1 : 0,
            visibility: minimize && !isChat ? 'visible' : 'hidden',
            //   transitionDelay: listConnectsMinimize ? '0ms' : '700ms',
            position: minimize && !isChat ? 'static' : 'absolute',
            height: 'inherit',
          }}
        >
          <ConnectInfo online={online} leftIndent={40} />
        </div>

        {isMarked && showMarked ? <MarkCircle size="22" color="#314963" className={style['mark-circle']} /> : ''}
      </li>
    );
  }
}

GroupItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  srcImg50: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  minimize: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  showMarked: PropTypes.bool,
  online: PropTypes.bool,
  isSelect: PropTypes.bool,
  isChat: PropTypes.bool,
  countMsg: PropTypes.number,
  countMsgPrivate: PropTypes.number,
  isMarked: PropTypes.bool,
};

GroupItem.defaultProps = {
  showMarked: true,
  isChat: false,
  isMarked: false,
  isSelect: false,
  isOnline: false,
  online: false,
  countMsg: 1,
  countMsgPrivate: 1,
};

export default GroupItem;
