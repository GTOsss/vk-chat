import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import MenuComponent from './comopnents/menu'
import * as searchObjectsActions from '../../store/actions/search-objects'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.onIconClickHandle = this.onIconClickHandle.bind(this);
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

  }

  onIconClickHandle(id) {
    this.props.markObject(id);
  }

  render() {
    const {children, searchObjects} = this.props;

    return (
      <div>
        { children ? children : <MenuComponent searchObjects={searchObjects}
                                               onSubmitHandle={this.onSubmitHandle}
                                               iconClickHandler={this.onIconClickHandle} /> }
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
  ...bindActionCreators(searchObjectsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu)