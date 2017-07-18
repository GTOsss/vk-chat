import React from 'react'
import {connect} from 'react-redux'
import { getGroups } from '../../../reducers/user'
import { bindActionCreators } from 'redux'

class Test extends React.Component {

  componentDidMount() {
    this.props.getGroups();
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return  {
    users: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getGroups: bindActionCreators(getGroups, dispatch)
  }
}

const Testt = connect(mapStateToProps, mapDispatchToProps)(Test);

const Main = ({children}) => (
  <div>
    main
    <Testt />
    {children}
  </div>
);


export default Main