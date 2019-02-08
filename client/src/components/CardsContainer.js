import React, {Component} from 'react'
import {Container} from 'react-bootstrap'
import axios from 'axios'
import PaperCard from './PaperCard'

class CardsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {data: []}
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/cards')
      .then(res => this.setState({data: res.data}))
  }

  render() {
    const cards = this.state.data.map(card => <PaperCard
      key={card.id}
      card={card}
    />)
    return (
      <Container className="mt-15">
        {cards}
      </Container>
    )
  }
}

export default CardsContainer
