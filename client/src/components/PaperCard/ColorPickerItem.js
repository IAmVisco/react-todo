import React, { Component } from 'react'

class ColorPickerItem extends Component {
  render() {
    return (
      <React.Fragment>
        <input
          type="radio"
          name="color"
          className="material-radio"
          id={this.props.color}
          value={this.props.color}
          onChange={this.props.onChange}
          defaultChecked={this.props.color === 'grey'}
        />
        <label
          className="material-label"
          htmlFor={this.props.color}
        ><span className={this.props.color} /></label>
      </React.Fragment>
    )
  }
}

export default ColorPickerItem
