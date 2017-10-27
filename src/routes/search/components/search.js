import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import ListGroups from '../../../components/lists/list-groups/index';
import SearchUsersForm from '../../../components/forms/search-users/index';
import Loader from '../../../components/loader';

import style from './search.scss';

const Groups = ({ groups, onClickItemListHandler, onSubmitHandle, onClickItemHeaderListHandler,
  loading, onScrollHandler, setRefList, sliceLoading, isBtnSearchDisable }) =>
  (
    <div className={style['wrap-scroll']} onScroll={onScrollHandler}>
      <div className="container-fluid">
        {loading
          ? (
            <div className="row">
              <Loader />
            </div>
          )
          : (
            <div className="row" ref={setRefList}>
              <div className={cx('col-md-6 offset-1', style['col-fix'])}>
                <ListGroups
                  groups={groups}
                  onClickItemListHandler={onClickItemListHandler}
                  onClickItemHeaderListHandler={onClickItemHeaderListHandler}
                />
                {sliceLoading ? <Loader mini /> : ''}
              </div>
              <div className={cx('col-md-4', style['col-fix'])}>
                <SearchUsersForm
                  onSubmit={onSubmitHandle}
                  isBtnSearchDisable={isBtnSearchDisable}
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );


Groups.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object),
  onClickItemListHandler: PropTypes.func.isRequired,
  onSubmitHandle: PropTypes.func.isRequired,
  onClickItemHeaderListHandler: PropTypes.func.isRequired,
  onScrollHandler: PropTypes.func,
  setRefList: PropTypes.func,
  loading: PropTypes.bool,
  sliceLoading: PropTypes.bool,
  isBtnSearchDisable: PropTypes.bool,
};

Groups.defaultProps = {
  groups: [],
  onScrollHandler: null,
  setRefList: null,
  loading: false,
  sliceLoading: false,
  isBtnSearchDisable: false,
};

export default Groups;
