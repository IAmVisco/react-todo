import React from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap'

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="sm" className="shadow">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="navbar-collapse">
            <Nav className="mr-auto">
              <Nav.Link className="nav-link" href="#home">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Header
