import React, { Component } from 'react'
import Header from './components/Header'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { showTextErrorToast } from './utils/utils'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    document.querySelector('.fa-circle-notch').classList.remove('d-none')
    document.querySelector('.btn-primary').disabled = true
    axios.post('http://localhost:4000/users/login', this.state)
      .then(res => {
        localStorage.setItem('authToken', res.data.token)
        localStorage.setItem('userId', res.data.userId)
        this.props.history.push('/')
      })
      .catch((err) => {
        document.querySelector('.fa-circle-notch').classList.add('d-none')
        document.querySelector('.btn-primary').disabled = false
        showTextErrorToast(err.response.data.msg)
      })
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
                <Button className="btn-wide" variant="primary" type="submit">Login <FontAwesome
                  name="circle-notch" className="d-none fa-spin" /></Button>
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
