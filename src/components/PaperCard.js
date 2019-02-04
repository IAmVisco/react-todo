import React from 'react'
import PaperCardFooter from './PaperCardFooter'
import '../styles/colors.css'

class PaperCard extends React.Component {
  render() {
    return (
      <div className={`paper-card ${this.props.card.color}`}>
        <h3>{this.props.card.name}</h3>
        <p>{this.props.card.description}</p>
        {this.props.card.files && <a
          href={this.props.card.files}
          target="_blank"
          rel="noopener noreferrer"
        >Attachements</a>}
        {this.props.card.dueTo && <p>Due to {this.props.card.dueTo}</p>}

        <PaperCardFooter
          status={this.props.card.status}
          createdAt={this.props.card.createdAt}
        />
      </div>
    )
  }
}

export default PaperCard