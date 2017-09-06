import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as searchObjectsActions from '../../../store/actions/search-objects'
import UserItem from './user-item'
import HeaderListGroups from '../../other/header-list-groups/index'
import SearchParams from '../../other/search-params/index';
import HeaderListPanel from '../../other/header-list-panel/index'
import Button from '../../forms/inputs/button/index'
import {Modal, ModalBody, ModalFooter} from 'reactstrap'

import style from './list-users.scss'

class ListUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isModalOpen: false};
    this.modalToggle = this.modalToggle.bind(this);
    this.okModalHandler = this.okModalHandler.bind(this);
  }

  okModalHandler() {
    this.props.showOrderBoxModal();
    this.setState({isModalOpen: false});
  }

  modalToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  addSpaceNumber(number) {
    return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  createListUsers(users) {
    return users.map((el, i) => (
      <a href={`https://www.vk.com/id${el.id}`} key={i} target='_blank' className={style['user-item']}>
        <UserItem name={`${el.first_name} ${el.last_name}`}
                  followersCount={`${this.addSpaceNumber(el.followers_count || 0)} подписчиков`}
                  srcImg100={el.photo_100} />
      </a>
    ));
  }

  render(){
    const {users, headerText, groups, searchParams, noSearch, btnSaveShow, addObject} = this.props;
    return(
      <div className={style['ul-screen']}>
        <Modal isOpen={this.state.isModalOpen} toggle={this.modalToggle}>
          <ModalBody>
            Данная функция платная. 1 месяц - 7 голосов.
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.okModalHandler}>Оплатить</Button>
            <Button onClick={this.modalToggle}>Отмена</Button>
          </ModalFooter>
        </Modal>


        <ul className={style['ul-users']}>
          {headerText ? <HeaderListPanel headerText={headerText}/> : ''}
          <HeaderListGroups groups={groups}/>
          <SearchParams searchParams={searchParams}/>
          <div className={style['wrap-button-save']}>
            {btnSaveShow && !noSearch ?
                <Button className={style['button-save']}
                        onClick={() => addObject(this.modalToggle)}>
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

const mapStateToProps = (state) => ({
  btnSaveShow: state.searchResults.btnSaveShow
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(searchObjectsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers)