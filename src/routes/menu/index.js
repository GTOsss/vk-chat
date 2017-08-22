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
    const {firebase, vkInfo: {viewerId}} = this.props;
    firebase.database().ref(`users/${viewerId}/searchObjects/info`).on('value', (searchObjects) => {
      let arraySearchObjects = [];
      searchObjects = searchObjects.val();
      for (let name in searchObjects) {
        if(searchObjects.hasOwnProperty(name))
          arraySearchObjects.push({...searchObjects[name], id: name})
      }

      this.props.updateSearchObjects(arraySearchObjects);
    });
  }

  onSubmitHandle(values) {
    let accessToken = this.props.vkInfo.accessToken;
    this.props.searchInSearchObjects({...values, accessToken});

    this.props.router.push('/menu/search-results');
  }

  onIconClickHandle(id) {
    this.props.markObject(id);
  }

  onDeleteClickHandler(id) {
    this.props.deleteObject(id);
  }

  render() {
    const {children, searchObjects} = this.props;

    return (
      <div>
        { children ? children : <MenuComponent searchObjects={searchObjects}
                                               onSubmitHandle={this.onSubmitHandle}
                                               iconClickHandler={this.onIconClickHandle}
                                               deleteClickHandler={this.onDeleteClickHandler} /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  vkInfo: state.user.vkInfo,
  firebase: state.user.firebase,
  searchObjects: state.searchObjects.objects
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(searchObjectsActions, dispatch),
  ...bindActionCreators(searchResultsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu)