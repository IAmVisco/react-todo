import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'

class Sidebar extends Component {
  render() {
    return (
      <Container className="mt-25">
        <button className="btn-block">Create new<i className="fas fa-angle-down"/></button>
      </Container>
    )
  }
}

export default Sidebar
