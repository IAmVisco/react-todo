import React from 'react'
import Moment from 'react-moment'
import FontAwesome from 'react-fontawesome'
import {Dropdown} from 'react-bootstrap'

const status = {
  'completed': 'Completed',
  'progress': 'In progress',
  'planning': 'Planning'
}
const icon = {
  'completed': 'check',
  'progress': 'clock',
  'planning': 'pencil-ruler'
}

class StatusDropdownToggle extends React.Component {
  handleClick = (e) => {
    e.preventDefault()
    this.props.onClick(e)
  }

  render() {
    return (
      <small className="c-pointer" onClick={this.handleClick}>
        <FontAwesome name={icon[this.props.status]} />
        {status[this.props.status]}
      </small>
    )
  }
}

class PaperCardFooter extends React.Component {
  getDropdownItems = () => {
    let items = []
    for (let prop in icon) {
      items.push(<Dropdown.Item key={prop}><FontAwesome name={icon[prop]} />{status[prop]}</Dropdown.Item>)
    }
    return items
  }

  render() {
    return (
      <div className="paper-card-footer">
        <Dropdown>
          <Dropdown.Toggle as={StatusDropdownToggle} status={this.props.status} />
          <Dropdown.Menu>
            {this.getDropdownItems()}
          </Dropdown.Menu>
        </Dropdown>
        <small className="text-muted pull-right">Created at <Moment
          format="MMM Do YYYY">{this.props.createdAt}</Moment></small>
      </div>
    )
  }
}

export default PaperCardFooter
