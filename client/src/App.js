import React from 'react'
import Header from './components/Header'
import {Col, Row} from 'react-bootstrap'
import Sidebar from './components/Sidebar'
import CardsContainer from './components/CardsContainer'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Header />
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>
          <Col lg={9}>
            <CardsContainer />
          </Col>
        </Row>
      </>
    )
  }
}

export default App
