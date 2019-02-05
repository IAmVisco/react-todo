import React from 'react'
import Form from 'react-bootstrap/Form'
import ColorPickerItem from './ColorPickerItem'

import '../styles/colors.css'

class ColorPicker extends React.Component {
  render() {
    const colors = [
      'grey',
      'red',
      'orange',
      'yellow',
      'green',
      'blue-green',
      'blue',
      'dark-blue',
      'purple',
      'pink'
    ]
    const colorCircles = colors.map(color =>
      <ColorPickerItem
        key={color}
        color={color}
        onChange={this.props.onChange}
        picked={this.props.value}
      />
    )
    return (
      <Form.Group>
        <Form.Label className="d-block">Color</Form.Label>
          {colorCircles}
      </Form.Group>
    )
  }
}

export default ColorPicker