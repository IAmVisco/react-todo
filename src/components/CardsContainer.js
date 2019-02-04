import React, {Component} from 'react'
import {Container} from 'react-bootstrap'
import PaperCard from './PaperCard'
import data from '../data/data'

class CardsContainer extends Component {
  render() {
    const cards = data.map(card => <PaperCard
      key={card.id}
      name={card.name}
      color={card.color}
      description={card.description}
      status = {card.status}
      color = {card.color}
      dueTo = {card.dueTo}
      files = {card.files}
      createdAt = {card.createdAt}
    />)
    return (
      <Container className="mt-15">
        {cards}
      </Container>
    )
  }
}

export default CardsContainer
