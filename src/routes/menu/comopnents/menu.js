import React from 'react'
import ListSearchObjects from '../../../components/lists/list-search-objects'
import SearchUsersForm from '../../../components/forms/search-users'
import Loader from '../../../components/loader'
import cx from 'classnames'
import {Modal, ModalBody, ModalFooter} from 'reactstrap'
import Button from '../../../components/forms/inputs/button'

import style from './menu.scss'

const Menu = ({searchObjects, loading, onSubmitHandle, iconClickHandler, deleteSearchObject,
                isModalOpen, modalToggle, }) => (
  <div className={style['wrap-scroll']}>
    <div className='container-fluid'>
      {loading
        ? <Loader/>
        : (
          <div className='row'>
            <div className={cx('col-md-6 offset-1', style['col-fix'])}>
              <Modal isOpen={isModalOpen} toggle={modalToggle}>
                <ModalBody>
                Удалить?
                </ModalBody>
                <ModalFooter>
                  <Button onClick={deleteSearchObject}>Удалить</Button>
                  <Button onClick={modalToggle}>Отмена</Button>
                </ModalFooter>
              </Modal>
              <ListSearchObjects searchObjects={searchObjects}
                                 iconClickHandler={iconClickHandler}
                                 modalToggle={modalToggle}/>

            </div>
            <div className={cx('col-md-3', style['col-fix'])}>
              {searchObjects && searchObjects.length
                ? <SearchUsersForm onSubmit={onSubmitHandle} isHideAdditional/>
                : ''}
            </div>
          </div>
        )}
    </div>
  </div>
);

export default Menu