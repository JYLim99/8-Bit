import React, { Component } from 'react'

class Alien extends Component {
  //Function to decide which type of aliens are rendered
  //Based on their index, different type of aliens are rendered
  getClassNames() {
    if (this.props.explode) {
      return 'App--Game--Alien1 App--Game--Explode'
    }

    if (this.props.alienIndex < 23) {
      return 'App--Game--Alien3 App--Game--Alien-Animation3'
    } else if (this.props.alienIndex < 45) {
      return 'App--Game--Alien2 App--Game--Alien-Animation2'
    } else {
      return 'App--Game--Alien1 App--Game--Alien-Animation1'
    }
  }
  render() {
    let styles = {
      top: this.props.alienTop,
      left: this.props.alienLeft,
      width: this.props.alienWidth,
      height: this.props.alienHeight,
    }
    return <div className={this.getClassNames()} style={styles}></div>
  }
}

export default Alien
