import React, {Component} from 'react'
import Header from './components/Header'
import {Button, Col, Container, Form, Row} from 'react-bootstrap'
import axios from 'axios'
import {showTextErrorToast} from './utils/utils'
import {ToastContainer} from 'react-toastify'

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConf: ''
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.passwordConf) {
      axios.post('http://localhost:3001/users/signup', this.state)
        .then(res => axios.post('http://localhost:3001/users/login', {
          email: this.state.email,
          password: this.state.password}))
        .then(res => {
          localStorage.setItem('authToken', res.data.roken)
          this.props.history.push('/')
        })
        .catch((err) => showTextErrorToast(err.response.data.msg))
    } else {
      showTextErrorToast('Passwords don\'t match!')
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <Row className="justify-content-md-center mt-50">
            <Col md={6}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    required
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange} />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange} />
                </Form.Group>

                <Form.Group controlId="password-conf">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConf"
                    required
                    value={this.state.passwordConf}
                    onChange={this.onChange} />
                </Form.Group>

                <Button className="btn-wide" variant="primary" type="submit">Sign up</Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </React.Fragment>
    )
  }
}

export default Signup
