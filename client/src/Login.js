import React, {Component} from 'react'
import Header from './components/Header'
import {Button, Container, Row, Col, Form} from 'react-bootstrap'
import {showTextErrorToast} from './utils/utils'
import axios from 'axios'
import {ToastContainer} from 'react-toastify'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/users/login', this.state)
      .then(res => {
        localStorage.setItem('authToken', res.data.token)
        this.props.history.push('/')
      })
      .catch((err) => showTextErrorToast(err.response.data.msg))
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <Row className="justify-content-md-center mt-50">
            <Col md={6}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange} />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange} />
                </Form.Group>
                <Button className="btn-wide" variant="primary" type="submit">Login</Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </React.Fragment>
    )
  }
}

export default Login
