import React from 'react'
import ListGroups from '../../../components/lists/list-groups/index'
import ListMessages from '../../../components/lists/list-messages'
import Loader from '../../../components/loader'
import {TitlePanel, ResizePanel} from './minimize-headers'

import {Input} from 'reactstrap'

import cx from 'classnames'
import style from './chat.scss'

const messages = [
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto at, consequuntur culpa deleniti distinctio doloremque doloribus ea eos exercitationem illum incidunt labore molestias mollitia neque nesciunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg'
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto at, consequuntur culpa deleniti distinctio doloremque doloribus ea eos exercitationem illum incidunt labore molestias mollitia neque nesciunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg'
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto at, consequuntur culpa deleniti distinctio doloremque doloribus ea eos exercitationem illum incidunt labore molestias mollitia neque nesciunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg'
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto at, consequuntur culpa deleniti distinctio doloremque doloribus ea eos exercitationem illum incidunt labore molestias mollitia neque nesciunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg'
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2016 18:24',
    message: 'erspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c836729/v836729561/15160/nhtiK9bdKcY.jpg'
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2015 18:24',
    message: 'piciatis quibusdam, quidem quis quisquam sipiciatis quibusdam, quidem quis quisquam si',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg'
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2014 18:24',
    message: ' untur culpa deleniti distinctio doloremque doloribus ea eos exercitats molliiunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis uptates.',
    photo_50: 'https://pp.userapi.com/c836729/v836729561/15160/nhtiK9bdKcY.jpg'
  }
];

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMinimized: false, filterConnect: 2, listMessage: true};
    this.minimizeToggle = this.minimizeToggle.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.onClickFilterConnects = this.onClickFilterConnects.bind(this);
  }

  componentDidUpdate() {
    if (this.wrapScroll) {
      this.wrapScroll.scrollTop = this.wrapScroll.scrollHeight;
    }
  }

  minimizeToggle() {
    this.setState({isMinimized: !this.state.isMinimized});
    if (this.state.isMinimized)
      this.updateStyle(250, 600, 'listMessage');
    else
      this.updateStyle(0, 450, 'listMessage');
  }

  onClickFilterConnects() {
    let i = this.state.filterConnect + 1;
    if (i > 2) i = 0;
    this.setState({filterConnect: i});
  }

  updateStyle(time1, time2, name) {
    setTimeout(() => {
      this.setState({[name]: false});
    }, time1);

    setTimeout(() => {
      this.setState({[name]: true});
    }, time2);
  }

  render() {
    const {groups, loading, sliceLoading, onScrollHandler, setRefList, onClickItemListHandler,
      onClickItemConnectHandler} = this.props;
    const selectGroup = groups.filter((el) => el.isSelect)[0];

    return (
      <div className='container-fluid'>
        {loading
          ?
          <div className='row'>
            <Loader/>
          </div>
          :
          <div className='row' ref={setRefList}>
            <div className={cx(this.state.isMinimized ? 'col-md-2' : 'col-md-6', style['col-fix'],
              !this.state.isMinimized ? style['t-300-300'] : style['t-300'])}>
              <div className={style['panel-list-groups']}>
                <div className={style['wrap-scroll-groups']} onScroll={onScrollHandler}>
                  <ListGroups groups={groups.filter(el => (
                    (this.state.filterConnect === 0) && !el.isConnect ||
                    (this.state.filterConnect === 1) && el.isConnect ||
                    (this.state.filterConnect === 2)
                  ))}
                              headerPanel={<ResizePanel onClickResize={this.minimizeToggle}
                                                        onClickFilter={this.onClickFilterConnects}
                                                        isConnect={this.state.filterConnect}
                                                        inverseIcon
                                                        showOtherIcon={this.state.filterConnect === 2} />}
                              noHeaderListGroups
                              noMargin
                              minimize={this.state.isMinimized}
                              onClickItemListHandler={this.state.isMinimized
                                ? onClickItemConnectHandler : onClickItemListHandler}
                              typeList={this.state.isMinimized ? 'connects' : undefined}/>
                  {sliceLoading ? <Loader mini/> : ''}
                </div>
              </div>
            </div>

            <div className={cx(this.state.isMinimized ? 'col-md-8' : 'col-md-6', style['col-fix'],
              !this.state.isMinimized ? style['t-300-300'] : style['t-300'])}>
              {selectGroup
                ?
                <div>
                  {this.state.isMinimized ? '' :
                    <div className={style['chat-glass-button']} onClick={this.minimizeToggle}>
                      <div className={style['chat-glass-button-text']}>
                        Открыть чат
                      </div>
                    </div>
                  }

                  <ListMessages messages={messages}
                                selectGroup={selectGroup}
                                ulStyle={this.state.listMessage ? {
                                  opacity: 1,
                                  transition: 'opacity 300ms linear 0s'
                                } : {
                                  opacity: 0,
                                  transition: 'opacity 0ms linear 0s'
                                }}
                                headerStyle={this.state.isMinimized ? {
                                    width: '638px',
                                    transition: 'width 300ms linear 0s'
                                  } :
                                  {
                                    width: '471px',
                                    transition: 'width 300ms linear 300ms'
                                  }}
                                refWrapScroll={(el) => {
                                  this.wrapScroll = el
                                }}/>
                </div>
                :
                <div className={style['panel']}>
                  <h6>Выберите группу из списка</h6>
                </div>
              }
            </div>

            <div className={cx('col-md-2', style['col-fix'],
              this.state.isMinimized ? style['t-visible'] : style['t-hidden'])}>
              <div className={cx(style['panel-list-groups'])}>
                <div className={style['wrap-scroll-groups']} onScroll={onScrollHandler}>
                  <ListGroups groups={groups}
                              noHeaderListGroups
                              noMargin
                              headerPanel={<TitlePanel title={'включенные'}/>}
                              minimize
                              onClickItemListHandler={onClickItemListHandler}
                              typeList={'chat'}/>
                  {sliceLoading ? <Loader mini/> : ''}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Chat