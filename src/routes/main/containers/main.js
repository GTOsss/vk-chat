import React from 'react'
import MainComponent from '../components/main'

class Main extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.route.vkInfo);
  }

  render() {
    return (
      <MainComponent {...this.props} vkInfo={this.props.route.vkInfo}/>
    )
  }
}

export default Main