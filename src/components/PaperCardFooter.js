import React from 'react'

class PaperCardFooter extends React.Component {
  render() {
    return (
      <div className="paper-card-footer">
        <span className="small"><i className="fas" />{this.props.status}</span>
        <span className="text-muted small pull-right">Created at {this.props.createdAt}</span>
      </div>
    )
  }
}

export default PaperCardFooter