import React from 'react'
import moment from 'moment'
import Moment from 'react-moment'
import PaperCardFooter from './PaperCardFooter'
import '../styles/colors.css'

class PaperCard extends React.Component {
  render() {
    let dueToFmt = ""
    const dueTo = this.props.card.dueTo
    if (dueTo) {
      if (moment().isBefore(dueTo) || this.props.card.status === 'completed') {
        dueToFmt = <p>Due to <Moment format="MMM Do YYYY">{dueTo}</Moment></p>
      }
      else {
        dueToFmt = <p className="text-danger">Due to <Moment format="MMM Do YYYY">{dueTo}</Moment></p>
      }
    }
    return (
      <div className={`paper-card ${this.props.card.color}`}>
        <h3>{this.props.card.name}</h3>
        <p>{this.props.card.description}</p>
        {this.props.card.files && <a
          href={this.props.card.files}
          target="_blank"
          rel="noopener noreferrer"
        >Attachments</a>}
        {dueToFmt}
        <PaperCardFooter
          status={this.props.card.status}
          createdAt={this.props.card.createdAt}
        />
      </div>
    )
  }
}

export default PaperCard
