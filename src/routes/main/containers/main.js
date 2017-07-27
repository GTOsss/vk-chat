import React from 'react'
import MainComponent from '../components/main'

class Main extends React.Component {
  render() {
    return (
      <MainComponent {...this.props} />
    )
  }
}

export default Main