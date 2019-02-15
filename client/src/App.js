import React from 'react'
import io from 'socket.io-client'
import {Col, Row} from 'react-bootstrap'

import spinner from './spinner.svg'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CardsContainer from './components/CardsContainer'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.socket = io('http://localhost:3001', {
      query: {
        token: localStorage.getItem('authToken')
      }
    })

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('authToken')) {
      this.props.history.push('/')
    }
    this.socket.on('error', (err) => {
      localStorage.removeItem('authToken')
      this.props.history.push('/login')
    })
    this.socket.on('cards', (data) => {
      document.querySelector('.spinner-container').classList.add('d-none')
      this.setState({data})
    })
    this.socket.emit('get cards')
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Row>
          <Col lg={3}>
            <Sidebar
            data={this.state.data}
            updateData={data => this.setState({data: data.data})}
            socket={this.socket}
          />
          </Col>
          <Col lg={9} className="position-relative">
            <div className="spinner-container full-absolute">
              <img src={spinner} alt="Loading spinner" className="spinner m-auto full-absolute" />
            </div>
            <CardsContainer data={this.state.data} updateData={data => this.setState({data: data.data})} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default App
