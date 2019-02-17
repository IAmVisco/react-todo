import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import Header from './components/Header'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className="pink-grad">
        <Header />
        <Row className="justify-content-center mt-50">
          <Col lg={10}>
            <h1>Hey, how's it going?</h1>
            <p>This is my small todo list app, using React and a bunch of cool stuff. Why not <Link to="signup">sing
              up?</Link></p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home
