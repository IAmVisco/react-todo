import React, {Component} from 'react'
import {Container} from 'react-bootstrap'
import PaperCard from './PaperCard'
import data from '../data/data'

class CardsContainer extends Component {
  render() {
    const cards = data.map(card => <PaperCard
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
