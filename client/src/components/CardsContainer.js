import React, {Component} from 'react'
import {Container} from 'react-bootstrap'
import PaperCard from './PaperCard/PaperCard'

class CardsContainer extends Component {
  updateCardStatus = (id, newStatus) => {
    document.querySelector('.spinner-container').classList.remove('d-none')
    this.props.socket.emit('update status', {id, newStatus})
  }

  removeCard = (id) => {
    document.getElementById('card-' + id).classList.add('card-fade-out')
    document.querySelector('.spinner-container').classList.remove('d-none')

    setTimeout(() => {
      this.props.socket.emit('delete card', id)
    }, 500)
  }

  render() {
    this.props.socket.on('cards', () => {
      document.querySelector('.spinner-container').classList.add('d-none')
    })

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
