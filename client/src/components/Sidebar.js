import React, {Component} from 'react'
import moment from 'moment'
import Collapsible from 'react-collapsible'
import FontAwesome from 'react-fontawesome'
import {ToastContainer} from 'react-toastify'
import TinyDatePicker from 'tiny-date-picker'
import {Button, Container, Form} from 'react-bootstrap'
import ColorPicker from './PaperCard/ColorPicker'

import 'tiny-date-picker/tiny-date-picker.min.css'
import 'react-toastify/dist/ReactToastify.min.css'

class Sidebar extends Component {
  state = {
    name: '',
    description: '',
    status: 'planning',
    color: 'grey',
    dueTo: '',
    files: '',
    createdAt: ''
  }

  componentDidMount = () => {
    TinyDatePicker(document.getElementById('dueTo'), {
      mode: 'dp-below',
      format: date => moment(date).format('YYYY-MM-DD')
    }).on('select', (_, dp) => this.setState({dueTo: moment(dp.state.selectedDate).format('YYYY-MM-DD')}))
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    document.querySelector('.spinner-container').classList.remove('d-none')
    document.querySelector('.fa-circle-notch').classList.remove('d-none')
    document.querySelector('.btn-primary').disabled = true

    this.props.socket.on('cards', () => {
      document.querySelector('.spinner-container').classList.add('d-none')
      document.querySelector('.fa-circle-notch').classList.add('d-none')
      document.querySelector('.btn-primary').disabled = false
    })
    this.props.socket.emit('post card', this.state)
  }

  render() {
    return (
      <Container className="mt-22">
        <Collapsible
          trigger="Create new"
          triggerTagName="button"
          easing="cubic-bezier(.25,.8,.25,1)"
          open
        >
          <Form className="p-1" onSubmit={this.handleSubmit}>
            <Form.Group controlId="card-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                autoComplete="off"
                required
                value={this.state.name}
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group controlId="card-desc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Description, 250 symbols max"
                autoComplete="off"
                maxLength="250"
                value={this.state.description}
                onChange={this.onChange} />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="radio"
                label="Planning"
                name="status"
                value="planning"
                onChange={this.onChange}
                checked={this.state.status === 'planning'}
              />
              <Form.Check
                type="radio"
                label="In progress"
                name="status"
                value="progress"
                onChange={this.onChange}
                checked={this.state.status === 'progress'}

              />
              <Form.Check
                type="radio"
                label="Completed"
                name="status"
                value="completed"
                onChange={this.onChange}
                checked={this.state.status === 'completed'}

              />
            </Form.Group>
            <ColorPicker onChange={this.onChange} value={this.props.color} />

            <Form.Group controlId="dueTo">
              <Form.Label>Due to</Form.Label>
              <Form.Control
                type="text"
                name="dueTo"
                autoComplete="off"
              />
            </Form.Group>

            <Button className="btn-wide" variant="primary" type="submit">Save <FontAwesome
              name="circle-notch" className="d-none fa-spin" /></Button>
          </Form>
        </Collapsible>
        <ToastContainer />
      </Container>
    )
  }
}

export default Sidebar
