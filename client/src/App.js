import React from 'react'
import Header from './components/Header'
import {Col, Row} from 'react-bootstrap'
import Sidebar from './components/Sidebar'
import CardsContainer from './components/CardsContainer'
import axios from 'axios'
import {showTextErrorToast} from './utils/utils'

class App extends React.Component {
  state = {
    data: []
  }

  componentDidMount() {
    axios.defaults.headers.common['x-access-token'] = localStorage.getItem('authToken')
    axios.get('http://localhost:3001/api/cards')
      .then(res => this.setState({data: res.data}))
      .catch((err) => {
        showTextErrorToast('Your session has expired, please log in again')
        this.props.history.push('/login')
      })
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Row>
          <Col lg={3}>
            <Sidebar data={this.state.data} updateData={data => this.setState({data})} />
          </Col>
          <Col lg={9}>
            <CardsContainer data={this.state.data} updateData={data => this.setState({data: data.data})} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default App
