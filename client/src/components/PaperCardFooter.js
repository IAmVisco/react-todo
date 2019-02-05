import React from 'react'
import Moment from 'react-moment'
import FontAwesome from 'react-fontawesome'
import {icon, status} from '../data/consts'

class PaperCardFooter extends React.Component {
  render() {
    return (
      <div className="paper-card-footer">
        <span className="small">
          <FontAwesome name={icon[this.props.status]}/>
          {status[this.props.status]}
        </span>
        <span className="text-muted small pull-right">Created at <Moment
          format="MMM Do YYYY">{this.props.createdAt}</Moment></span>
      </div>
    )
  }
}

export default PaperCardFooter
