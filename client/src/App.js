import React from 'react'
import Header from './components/Header'
import {Col, Row} from 'react-bootstrap'
import Sidebar from './components/Sidebar'
import CardsContainer from './components/CardsContainer'
// import axios from 'axios'
import io from 'socket.io-client'
import spinner from './spinner.svg'
import {showTextErrorToast} from './utils/utils'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.socket = io('http://localhost:8000')
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.socket.on('cards', data => {
      document.querySelector('.spinner-container').classList.add('d-none')
      this.setState({data})
    })
    this.socket.emit('getCards')
    // document.querySelector('.spinner-container').classList.remove('d-none')
    // axios.defaults.headers.common['x-access-token'] = localStorage.getItem('authToken')
    // axios.get('http://localhost:3001/api/cards')
    //   .then(response => {
    //     document.querySelector('.spinner-container').classList.add('d-none')
    //     this.setState({data: response.data})
    //   }).catch((err) => {
    //     showTextErrorToast('Your session has expired, please log in again')
    //     localStorage.removeItem('authToken')
    //     this.props.history.push('/login')
    //   })
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
