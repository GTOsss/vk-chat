import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ListGroups from '../../../components/lists/list-groups/index';
import ListMessages from '../../../components/lists/list-messages';
import Loader from '../../../components/loader';
import { TitlePanel, ResizePanel } from './minimize-headers';

import style from './chat.scss';

const messages = [
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto at, consequuntur culpa deleniti distinctio doloremque doloribus ea eos exercitationem illum incidunt labore molestias mollitia neque nesciunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg',
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto at, consequuntur culpa deleniti distinctio doloremque doloribus ea eos exercitationem illum incidunt labore molestias mollitia neque nesciunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg',
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto at, consequuntur culpa deleniti distinctio doloremque doloribus ea eos exercitationem illum incidunt labore molestias mollitia neque nesciunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg',
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto at, consequuntur culpa deleniti distinctio doloremque doloribus ea eos exercitationem illum incidunt labore molestias mollitia neque nesciunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg',
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2016 18:24',
    message: 'erspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c836729/v836729561/15160/nhtiK9bdKcY.jpg',
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2015 18:24',
    message: 'piciatis quibusdam, quidem quis quisquam sipiciatis quibusdam, quidem quis quisquam si',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg',
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2014 18:24',
    message: ' untur culpa deleniti distinctio doloremque doloribus ea eos exercitats molliiunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis uptates.',
    photo_50: 'https://pp.userapi.com/c836729/v836729561/15160/nhtiK9bdKcY.jpg',
  },
];

class Chat extends React.Component {
  static onSubmitHandler(values) {
    console.log(values);
  }

  constructor(props) {
    super(props);
    this.state = {
      isMinimized: false,
      filterCount: 2,
      filterValue: 'all',
      listMessagesAnimate: false,
    };
    this.minimizeToggle = this.minimizeToggle.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.onClickFilterConnects = this.onClickFilterConnects.bind(this);
  }

  componentDidUpdate() {
    if (this.wrapScroll) {
      this.wrapScroll.scrollTop = this.wrapScroll.scrollHeight;
    }
  }

  onClickFilterConnects() {
    let i = this.state.filterCount + 1;
    if (i > 2) i = 0;

    let filterValue;
    switch (i) {
      case 0:
        filterValue = 'connect';
        break;
      case 1:
        filterValue = 'disconnect';
        break;
      default:
        filterValue = 'all';
        break;
    }

    this.setState({
      filterCount: i,
      filterValue,
    });
  }

  updateStyle(time1, time2, name) {
    if (time1 !== -1) {
      setTimeout(() => {
        this.setState({ [name]: !this.state[name] });
      }, time1);
    }

    if (time2 !== -1) {
      setTimeout(() => {
        this.setState({ [name]: !this.state[name] });
      }, time2);
    }
  }

  minimizeToggle() {
    this.setState({ isMinimized: !this.state.isMinimized, listMessagesAnimate: true });

    if (!this.state.isMinimized) {
      const group = this.props.groups.filter(el => el.isSelect)[0];
      if (!group.isConnect) {
        this.props.onClickItemConnectHandler(group.id);
      }
    }

    // if (this.state.isMinimized) {
    // } else {
    // }
  }

  render() {
    const {
      groups, loading, sliceLoading, onScrollHandler, setRefList, onClickItemListHandler,
      onClickItemConnectHandler,
    } = this.props;
    const selectGroup = groups.filter(el => el.isSelect)[0];

    return (
      <div className="container-fluid">
        {loading ?

          <div className="row">
            <Loader />
          </div> :

          <div className="row" ref={setRefList}>
            <div className={cx(
              style['col-fix'],
              this.state.isMinimized ? 'col-md-2' : 'col-md-6',
              this.state.isMinimized ? style['t-300-150'] : style['t-300-300'],
            )}
            >
              <div className={style['panel-list-groups']}>
                <div className={style['wrap-scroll-groups']} onScroll={onScrollHandler}>
                  <ListGroups
                    groups={groups}
                    filter={(!this.state.isMinimized ? 'all' : '') || this.state.filterValue}
                    headerPanel={<ResizePanel
                      isMinimized={this.state.isMinimized}
                      onClickResize={this.minimizeToggle}
                      onClickFilter={this.onClickFilterConnects}
                      isConnect={this.state.filterValue === 'connect'}
                      inverseIcon
                      showOtherIcon={this.state.filterValue === 'all'}
                      css={!this.state.isMinimized ? {
                        top: '-50px',
                        transition: 'top 150ms linear 0ms',
                      } : {
                        top: '0px',
                        transition: 'top 150ms linear 750ms',
                      }}
                    />}
                    headerStyle={!this.state.isMinimized ? {
                      marginTop: '0px',
                      transition: 'margin-top 150ms linear 600ms',
                      // visibility: 'visible',
                      // position: 'static',
                      // transition: 'visibility 0ms linear 600ms',
                    } : {
                      // visibility: 'hidden',
                      // position: 'absolute',
                      marginTop: '-72px',
                      transition: 'margin-top  150ms linear 0ms',
                      // minWidth: '300px',
                      // transition: 'margin-top 200ms linear 0s',
                    }}
                    noHeaderListGroups
                    noMargin
                    minimize={this.state.isMinimized}
                    onClickItemListHandler={this.state.isMinimized
                      ? onClickItemConnectHandler : onClickItemListHandler}
                    typeList={this.state.isMinimized ? 'connects' : undefined}
                  />
                  {sliceLoading ? <Loader mini /> : ''}
                </div>
              </div>
            </div>

            <div className={cx(this.state.isMinimized ? 'col-md-8' : 'col-md-6', style['col-fix'],
              !this.state.isMinimized ? style['t-300-300'] : style['t-300-150'])}
            >
              {selectGroup ?
                <div>
                  {this.state.isMinimized ?
                    '' :
                    <div
                      className={style['chat-glass-button']}
                      onClick={this.minimizeToggle}
                    >
                      <div className={style['chat-glass-button-text']}>
                        Открыть чат
                      </div>
                    </div>
                  }

                  <ListMessages
                    messages={messages}
                    selectGroup={selectGroup}
                    switchAnimate={this.state.isMinimized}
                    isAnimate={this.state.listMessagesAnimate}
                    onSubmitHandler={this.onSubmitHandler}
                    headerStyle={this.state.isMinimized
                      ? {
                        width: '647px',
                        transition: 'width 150ms linear 300ms',
                      } : {
                        width: '480px',
                        transition: 'width 150ms linear 300ms',
                      }}
                    refWrapScroll={(el) => {
                      this.wrapScroll = el;
                    }}
                  />
                </div>
                :
                <div className={style.panel}>
                  <h6>Выберите группу из списка</h6>
                </div>
              }
            </div>

            <div className={cx('col-md-2', style['col-fix'],
              this.state.isMinimized ? style['t-visible'] : style['t-hidden'])}
            >
              <div className={cx(style['panel-list-groups'])}>
                <div className={style['wrap-scroll-groups']} onScroll={onScrollHandler}>
                  <ListGroups
                    groups={groups}
                    className={style['chat-panel']}
                    noHeaderListGroups
                    noMargin
                    headerPanel={<TitlePanel title={'включенные'} />}
                    minimize
                    onClickItemListHandler={onClickItemListHandler}
                    typeList={'chat'}
                    noHeader
                  />
                  {sliceLoading ? <Loader mini /> : ''}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

Chat.propTypes = {
  setRefList: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  onScrollHandler: PropTypes.func.isRequired,
  onClickItemListHandler: PropTypes.func.isRequired,
  onClickItemConnectHandler: PropTypes.func.isRequired,
  sliceLoading: PropTypes.bool,
};

Chat.defaultProps = {
  sliceLoading: false,
  loading: true,
};

export default Chat;
