import React from 'react'
import FontAwesome from 'react-fontawesome'
import {LinkContainer} from 'react-router-bootstrap'
import {Nav, Navbar, Container} from 'react-bootstrap'

class Header extends React.Component {
  render() {
    let loginPartial
    if (localStorage.getItem('authToken')) {
      loginPartial =
        <React.Fragment>
          <LinkContainer to="/logout">
            <Nav.Link><FontAwesome name="sign-out-alt"/>Logout</Nav.Link>
          </LinkContainer>
        </React.Fragment>
    } else {
      loginPartial =
        <React.Fragment>
          <LinkContainer to="/login">
            <Nav.Link><FontAwesome name="sign-in-alt"/>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Nav.Link><FontAwesome name="user"/>Register</Nav.Link>
          </LinkContainer>
        </React.Fragment>
    }
    return (
      <Navbar bg="light" expand="sm" className="shadow">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>React ToDo</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle/>
          <Navbar.Collapse id="navbar-collapse">
            <Nav className="mr-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Nav>
            {loginPartial}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Header
