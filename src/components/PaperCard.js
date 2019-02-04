import React from 'react'
import PaperCardFooter from './PaperCardFooter'
import '../styles/colors.css'

class PaperCard extends React.Component {
  render() {
    return (
      <div className={`paper-card ${this.props.color}`}>
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
        {this.props.files && <a href={this.props.files} target="_blank">Attachements</a>}
        {this.props.dueTo && <p>Due to {this.props.dueTo}</p>}

        <PaperCardFooter
          status={this.props.status}
          createdAt={this.props.createdAt}
        />
      </div>
    )
  }
}

export default PaperCard