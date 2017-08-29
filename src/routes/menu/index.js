import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import MenuComponent from './comopnents/menu'
import * as searchObjectsActions from '../../store/actions/search-objects'
import * as searchResultsActions from '../../store/actions/search-results'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isModalOpen: false};
    this.onIconClickHandle = this.onIconClickHandle.bind(this);
    this.deleteSearchObject = this.deleteSearchObject.bind(this);
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.headerClickHandler = this.headerClickHandler.bind(this);
  }

  componentWillMount() {
    this.props.updateSearchObjects();
  }

  onSubmitHandle(values) {
    this.props.searchInSearchObjects({...values});
    this.props.router.push('/menu/search-results');
  }

  onIconClickHandle(id) {
    this.props.markObject(id);
  }

  deleteSearchObject() {
    if(this.state.currentId) {
      this.props.deleteObject(this.state.currentId);
    }
    this.setState({isModalOpen: false})
  }

  modalToggle(id) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      currentId: id
    });
  }

  headerClickHandler(obj) {
    this.props.loadUsers(obj);
    this.props.router.push('/menu/search-results');
  }

  render() {
    const {children, searchObjects, loadingObj} = this.props;
    return (
      <div>
        { children ? children : <MenuComponent searchObjects={searchObjects}
                                               onSubmitHandle={this.onSubmitHandle}
                                               iconClickHandler={this.onIconClickHandle}
                                               loading={loadingObj.searchObjects}
                                               isModalOpen={this.state.isModalOpen}
                                               modalToggle={this.modalToggle}
                                               deleteSearchObject={this.deleteSearchObject}
                                               headerClickHandler={this.headerClickHandler}/> }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  searchObjects: state.searchObjects.objects,
  loadingObj: state.loading.loadingObj
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(searchObjectsActions, dispatch),
  ...bindActionCreators(searchResultsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu)