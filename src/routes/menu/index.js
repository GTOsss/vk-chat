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

  onSubmitHandle(values) {

  }

  onIconClickHandle(id) {
    this.props.markObject(id);
  }

  render() {
    const {searchObjects, children} = this.props;

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
  searchObjects: state.searchObjects.objects
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(searchObjectsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu)