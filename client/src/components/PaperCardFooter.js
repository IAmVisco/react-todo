import React from 'react'
import Moment from 'react-moment'
import FontAwesome from 'react-fontawesome'
import {icon, status} from '../data/consts'
import {Dropdown} from "react-bootstrap"

class PaperCardFooter extends React.Component {
  render() {
    return (
      <div className="paper-card-footer">
        <span className="small" style={{'cursor': 'pointer'}}>
          <FontAwesome name={icon[this.props.status]}/>
          {status[this.props.status]}
        </span>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <span className="text-muted small pull-right">Created at <Moment
          format="MMM Do YYYY">{this.props.createdAt}</Moment></span>
      </div>
    )
  }
}

export default PaperCardFooter
