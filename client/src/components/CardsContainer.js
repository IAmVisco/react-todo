import React, {Component} from 'react'
import {Container} from 'react-bootstrap'
import PaperCard from './PaperCard/PaperCard'
import axios from 'axios'
import {showStatusErrorToast} from '../utils/utils'

class CardsContainer extends Component {
  updateCardStatus = (id, newStatus) => {
    axios.patch('http://localhost:3001/api/card', {id, newStatus})
      .then(this.props.updateData)
      .catch(showStatusErrorToast)
  }
  removeCard = (id) => {
    document.getElementById('card-' + id).classList.add('card-fade-out')
    setTimeout(() => {
      axios.delete('http://localhost:3001/api/card', {
        data: {
          id: id
        }
      }).then(this.props.updateData)
        .catch(showStatusErrorToast)
    }, 800)
  }

  render() {
    const cards = this.props.data.map(card => <PaperCard
      key={card.id}
      card={card}
      handleRemove={this.removeCard}
      updateCardStatus={this.updateCardStatus}
    />)
    return (
      <Container className="mt-15">
        {cards}
      </Container>
    )
  }
}

export default CardsContainer
