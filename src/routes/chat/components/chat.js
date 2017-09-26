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
    this.state = {
      isMinimized: false,
      filterCount: 2,
      filterValue: 'all',
      listMessage: true,
      listConnects: true,
      listConnectsHeaderMinimize: false,
      listConnectsMinimize: false
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

  minimizeToggle() {
    this.setState({isMinimized: !this.state.isMinimized});

    if (!this.state.isMinimized) {
      let group = this.props.groups.filter((el) => el.isSelect)[0];
      if (!group.isConnect)
        this.props.onClickItemConnectHandler(group.id);
    }

    if (this.state.isMinimized) {
      this.updateStyle(250, 700, 'listMessage');
      this.updateStyle(0, 700, 'listConnects');
      this.updateStyle(0, -1, 'listConnectsHeaderMinimize');
      this.updateStyle(700, -1, 'listConnectsMinimize');
    }
    else {
      this.updateStyle(0, 550, 'listMessage');
      this.updateStyle(0, 550, 'listConnects');
      this.updateStyle(-1, 100, 'listConnectsHeaderMinimize');
      this.updateStyle(700, -1, 'listConnectsMinimize');
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
      case 2:
        filterValue = 'all';
        break;
    }

    this.setState({
      filterCount: i,
      filterValue
    });
  }

  updateStyle(time1, time2, name) {
    if (time1 !== -1)
      setTimeout(() => {
        this.setState({[name]: !this.state[name]});
      }, time1);

    if (time2 !== -1)
      setTimeout(() => {
        this.setState({[name]: !this.state[name]});
      }, time2);
  }

  render() {
    const {
      groups, loading, sliceLoading, onScrollHandler, setRefList, onClickItemListHandler,
      onClickItemConnectHandler
    } = this.props;
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
                  <ListGroups groups={groups}
                              filter={(!this.state.listConnectsMinimize ? 'all' : '') || this.state.filterValue}
                              headerPanel={<ResizePanel onClickResize={this.minimizeToggle}
                                                        onClickFilter={this.onClickFilterConnects}
                                                        isConnect={this.state.filterValue === 'connect'}
                                                        inverseIcon
                                                        showOtherIcon={this.state.filterValue === 'all'}
                                                        css={!this.state.listConnectsHeaderMinimize ? {
                                                          marginTop: '-50px',
                                                          transition: 'margin-top 150ms linear 0ms'
                                                        } : {
                                                          marginTop: '0px',
                                                          transition: 'margin-top 300ms linear 0s'
                                                        }}
                                                        noHeader/>}
                              headerStyle={this.state.listConnects ? {
                                marginTop: '0',
                                transition: 'margin-top 150ms linear 0s'
                              } : {
                                marginTop: '-72px',
                                minWidth: '300px',
                                transition: 'margin-top 0ms linear 0s'
                              }}
                              noHeaderListGroups
                              noMargin
                              minimize={this.state.isMinimized}
                              onClickItemListHandler={this.state.isMinimized
                                ? onClickItemConnectHandler : onClickItemListHandler}
                              typeList={this.state.listConnectsMinimize ? 'connects' : undefined}
                              listConnectsMinimize={this.state.listConnectsMinimize}/>
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
                              typeList={'chat'}
                              listConnectsMinimize={this.state.listConnectsMinimize}/>
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