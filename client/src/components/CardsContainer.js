import React, {Component} from 'react'
import {Container} from 'react-bootstrap'
import PaperCard from './PaperCard/PaperCard'
import axios from 'axios'
import {showStatusErrorToast} from '../utils/utils'

class CardsContainer extends Component {
  updateCardStatus = (id, newStatus) => {
    document.querySelector('.spinner-container').classList.remove('d-none')
    axios.patch('http://localhost:3001/api/card', {id, newStatus})
      .then(response => {
        document.querySelector('.spinner-container').classList.add('d-none')
        this.props.updateData(response)
      }).catch(showStatusErrorToast)
  }
  removeCard = (id) => {
    document.getElementById('card-' + id).classList.add('card-fade-out')
    document.querySelector('.spinner-container').classList.remove('d-none')
    setTimeout(() => {
      axios.delete('http://localhost:3001/api/card', {
        data: {id}
      }).then(response => {
        document.querySelector('.spinner-container').classList.add('d-none')
        this.props.updateData(response)
      }).catch(showStatusErrorToast)
    }, 500)
  }

  render() {
    let cards = this.props.data.map(card => <PaperCard
      key={card._id}
      card={card}
      handleRemove={this.removeCard}
      updateCardStatus={this.updateCardStatus}
    />)
    if (cards.length === 0)
      cards = <h2 className="empty-label">Nothing here yet :(</h2>
    return (
      <Container className="mt-15">
        {cards}
      </Container>
    )
  }
}

export default CardsContainer
