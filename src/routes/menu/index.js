import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import MenuComponent from './comopnents/menu'
import * as searchObjectsActions from '../../store/actions/search-objects'
import * as searchResultsActions from '../../store/actions/search-results'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.onIconClickHandle = this.onIconClickHandle.bind(this);
    this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
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

  onDeleteClickHandler(id) {
    this.props.deleteObject(id);
  }

  render() {
    const {children, searchObjects, loadingObj} = this.props;
    return (
      <div>
        { children ? children : <MenuComponent searchObjects={searchObjects}
                                               onSubmitHandle={this.onSubmitHandle}
                                               iconClickHandler={this.onIconClickHandle}
                                               deleteClickHandler={this.onDeleteClickHandler}
                                               loading={loadingObj.searchObjects} /> }
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