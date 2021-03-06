import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import * as searchObjectsActions from '../../../store/actions/search-objects';
import UserItem from './user-item';
import HeaderListGroups from '../../other/header-list-groups/index';
import SearchParams from '../../other/search-params/index';
import HeaderListPanel from '../../other/header-list-panel/index';
import Button from '../../forms/inputs/button/index';
import ProgressBar from '../../progress-bar';

import style from './list-users.scss';

class ListUsers extends React.Component {
  static addSpaceNumber(number) {
    return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }


  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
    this.modalToggle = this.modalToggle.bind(this);
    this.okModalHandler = this.okModalHandler.bind(this);
  }

  okModalHandler() {
    this.props.actions.showOrderBoxModal();
    this.setState({ isModalOpen: false });
  }

  modalToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    const { users, headerText, groups, searchParams, noSearch, btnSaveShow, addObject,
      isSearchSO, progressFilter } = this.props;
    return (
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
          {headerText ? <HeaderListPanel headerText={headerText} /> : ''}
          <HeaderListGroups groups={groups} />
          <SearchParams searchParams={searchParams} />
          <div
            className={style['wrap-button-save']}
            style={{ border: users && users.length ? '' : 'none' }}
          >
            {!noSearch && (progressFilter < 100) ?
              <ProgressBar progress={progressFilter}>
                Фильтрация
              </ProgressBar> : ''}
            {progressFilter === 100 && btnSaveShow && !noSearch ?
              <Button
                className={style['button-save']}
                onClick={() => addObject(this.modalToggle, isSearchSO)}
              >
                  Сохранить результаты поиска
              </Button>
              : ''}
          </div>

          {users.map(el => (
            el ?
              <a
                href={`https://www.vk.com/id${el.id}`}
                key={el.id} target="_blank"
                className={style['user-item']}
              >
                <UserItem
                  name={`${el.first_name} ${el.last_name}`}
                  followersCount={`${ListUsers.addSpaceNumber(el.followers_count || 0)} подписчиков`}
                  srcImg100={el.photo_100}
                />
              </a> : null
          ))}
        </ul>
      </div>
    );
  }
}

ListUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  groups: PropTypes.arrayOf(PropTypes.object),
  headerText: PropTypes.string,
  searchParams: PropTypes.objectOf(PropTypes.any),
  noSearch: PropTypes.bool,
  btnSaveShow: PropTypes.bool,
  isSearchSO: PropTypes.bool,
  addObject: PropTypes.func,
  progressFilter: PropTypes.number,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

ListUsers.defaultProps = {
  users: [],
  groups: [],
  headerText: '',
  searchParams: {},
  noSearch: false,
  btnSaveShow: false,
  isSearchSO: false,
  progressFilter: 0,
  addObject: null,
};

const mapStateToProps = state => ({
  btnSaveShow: state.searchResults.btnSaveShow,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(searchObjectsActions, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
