import React from 'react'
import Header from './components/Header'
import {Col, Row} from 'react-bootstrap'
import Sidebar from './components/Sidebar'
import CardsContainer from './components/CardsContainer'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }

    this.updateData = this.updateData.bind(this)
  }

  updateData(data) {
    this.setState({data})
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/cards')
      .then(res => this.updateData(res.data))
  }

  render() {
    return (
      <>
        <Header />
        <Row>
          <Col lg={3}>
            <Sidebar data={this.state.data} updateData={this.updateData} />
          </Col>
          <Col lg={9}>
            <CardsContainer data={this.state.data} />
          </Col>
        </Row>
      </>
    )
  }
}

export default App
