import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MenuComponent from './comopnents/menu';
import * as searchObjectsActions from '../../store/actions/search-objects';
import * as searchResultsActions from '../../store/actions/search-results';

class Menu extends React.Component {
  static isBtnSearchDisable(searchObjects) {
    for (let i = 0; i < searchObjects.length; i += 1) {
      if (searchObjects[i].isMarked) {
        return false;
      }
    }
    return true;
  }

  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
    this.onIconClickHandle = this.onIconClickHandle.bind(this);
    this.deleteSearchObject = this.deleteSearchObject.bind(this);
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.headerClickHandler = this.headerClickHandler.bind(this);
  }

  componentWillMount() {
    this.props.actions.updateSearchObjects();
  }

  onSubmitHandle(values) {
    this.props.actions.searchInSearchObjects({ ...values });
    this.props.router.push('/menu/search-results');
  }

  onIconClickHandle(id) {
    this.props.actions.markObject(id);
  }

  deleteSearchObject() {
    if (this.state.currentId) {
      this.props.actions.deleteObject(this.state.currentId);
    }
    this.setState({ isModalOpen: false });
  }

  modalToggle(id) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      currentId: id,
    });
  }

  headerClickHandler(obj) {
    this.props.actions.loadUsers(obj);
    this.props.router.push('/menu/search-results');
  }

  render() {
    const { children, searchObjects, loadingObj } = this.props;
    return (
      <div>
        { children || <MenuComponent
          searchObjects={searchObjects}
          onSubmitHandle={this.onSubmitHandle}
          iconClickHandler={this.onIconClickHandle}
          loading={loadingObj.searchObjects}
          isModalOpen={this.state.isModalOpen}
          modalToggle={this.modalToggle}
          deleteSearchObject={this.deleteSearchObject}
          headerClickHandler={this.headerClickHandler}
          isBtnSearchDisable={Menu.isBtnSearchDisable(searchObjects)}
        /> }
      </div>
    );
  }
}

Menu.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  router: PropTypes.objectOf(PropTypes.any),
  searchObjects: PropTypes.arrayOf(PropTypes.any),
  loadingObj: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.number])),
};

Menu.defaultProps = {
  searchObjects: [],
  loadingObj: true,
  router: {},
};

const mapStateToProps = state => ({
  searchObjects: state.searchObjects.objects,
  loadingObj: state.loading.loadingObj,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(searchObjectsActions, dispatch),
    ...bindActionCreators(searchResultsActions, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
