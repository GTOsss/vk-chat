import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as searchObjectsActions from '../../../store/actions/search-objects'
import UserItem from './user-item'
import HeaderListGroups from '../../other/header-list-groups/index'
import SearchParams from '../../other/search-params/index';
import HeaderListPanel from '../../other/header-list-panel/index'
import Button from '../../forms/inputs/button/index'

import style from './list-users.scss'

class ListUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {btnSaveShow: true}
  }

  addSpaceNumber(number) {
    return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  createListUsers(users) {
    let items = [];
    for (let i = 0; i < Math.min(100, users.length); i++) {
      let el = users[i];
      items.push(
        <a href={`https://www.vk.com/id${el.id}`} key={i} target='_blank' className={style['user-item']}>
          <UserItem name={`${el.first_name} ${el.last_name}`}
                    followersCount={`${this.addSpaceNumber(el.followers_count || 0)} подписчиков`}
                    srcImg100={el.photo_100} />
        </a>
      );
    }
    return items;
  }

  render(){
    const {users, headerText, groups, searchParams, addObject} = this.props;
    return(
      <div className={style['ul-screen']}>
        <ul className={style['ul-users']}>
          {headerText ? <HeaderListPanel headerText={headerText}/> : ''}
          <HeaderListGroups groups={groups}/>
          <SearchParams searchParams={searchParams}/>
          <div className={style['wrap-button-save']}>
            {this.state.btnSaveShow ?
                <Button className={style['button-save']}
                        onClick={() => {
                          this.setState({btnSaveShow: !this.state.btnSaveShow});
                          addObject({users, searchParams, groups});
                        }}>
                  Сохранить результаты поиска
                </Button>
              : ''}
          </div>
          {users ? this.createListUsers(users) : ''}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(searchObjectsActions, dispatch)
});

export default connect(null, mapDispatchToProps)(ListUsers)