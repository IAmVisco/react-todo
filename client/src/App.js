import React from 'react'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'

import { gql, showTextErrorToast } from './utils/utils'
import spinner from './spinner.svg'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CardsContainer from './components/CardsContainer'

class App extends React.Component {
  state = {
    data: []
  }

  reloadData = () => {
    axios.post('http://localhost:4000/graphql', {
      query: gql.GET_CARDS,
      variables: {
        userId: localStorage.getItem('userId')
      }
    }).then((response) => {
      const { data } = response.data
      document.querySelector('.spinner-container').classList.add('d-none')
      this.setState({ data: data.getCards })
    }).catch((err) => {
      localStorage.removeItem('authToken')
      this.props.history.push('/login')
      showTextErrorToast(err.response.status + ' ' + err.response.statusText)
    })
  }

  componentDidMount() {
    if (!localStorage.getItem('authToken')) {
      this.props.history.push('/')
    }

    axios.defaults.headers.common['x-access-token'] = localStorage.getItem('authToken')
    this.reloadData()
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Row>
          <Col lg={3}>
            <Sidebar
              data={this.state.data}
              updateData={card => this.setState({ data: [card].concat(this.state.data) })}
            />
          </Col>
          <Col lg={9} className="position-relative">
            <div className="spinner-container full-absolute">
              <img src={spinner} alt="Loading spinner" className="spinner m-auto full-absolute" />
            </div>
            <CardsContainer
              data={this.state.data}
              reloadData={this.reloadData}
            />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default App
