import React, {Component} from 'react'
import {Container} from 'react-bootstrap'
import PaperCard from './PaperCard'
import axios from 'axios'

class CardsContainer extends Component {
  removeCard = (id) => {
    document.getElementById('card-' + id).classList.add('card-fade-out')
    setTimeout(() => {
      axios.delete('http://localhost:3001/api/card', {
        data: {
          id: id
        }
      }).then(this.props.updateData)
    }, 800)
  }

  render() {
    const cards = this.props.data.map(card => <PaperCard
      key={card.id}
      card={card}
      handleRemove={this.removeCard}
    />)
    return (
      <Container className="mt-15">
        {cards}
      </Container>
    )
  }
}

export default CardsContainer
