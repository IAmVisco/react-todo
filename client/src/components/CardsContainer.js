import React, { Component } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { gql } from '../utils/utils'
import PaperCard from './PaperCard/PaperCard'

class CardsContainer extends Component {
  updateCardStatus = (id, newStatus) => {
    document.querySelector('.spinner-container').classList.remove('d-none')

    document.querySelector('.spinner-container').classList.add('d-none')
  }

  removeCard = (id) => {
    document.getElementById('card-' + id).classList.add('card-fade-out')
    document.querySelector('.spinner-container').classList.remove('d-none')

    setTimeout(() => {
      axios.post('http://localhost:4000/graphql', {
        query: gql.DELETE_CARD,
        variables: {
          id: id,
          userId: localStorage.getItem('userId')
        }
      }).then((response) => {
        this.props.reloadData()
        document.querySelector('.spinner-container').classList.add('d-none')
      })
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
