import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import MenuComponent from './comopnents/menu'
import * as searchObjectsActions from '../../store/actions/search-objects'

class Menu extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmitHandle(values) {

  }

  render() {
    const {searchObjects, children} = this.props;

    return (
      <div>
        { children ? children : <MenuComponent searchObjects={searchObjects}
                                               onSubmitHandle={this.onSubmitHandle} /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  searchObjects: state.searchObjects.objects
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(dispatch, searchObjectsActions)
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu)