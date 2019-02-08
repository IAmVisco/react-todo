import React, {Component} from 'react'
import {Container} from 'react-bootstrap'
import PaperCard from './PaperCard'

class CardsContainer extends Component {
  render() {
    const cards = this.props.data.map(card => <PaperCard
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
