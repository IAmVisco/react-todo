import React, {Component} from 'react'
import Collapsible from 'react-collapsible'
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form"
import {Button} from "react-bootstrap"

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      status: "",
      color: "",
      dueTo: "",
      files: "",
      createdAt: ""
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state)
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
          <Form style={{"padding": 3}} onSubmit={this.handleSubmit}>
            <Form.Group controlId="card-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                autoComplete="off"
                value={this.state.name}
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group controlId="card-desc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Description"
                autoComplete="off"
                value={this.state.description}
                onChange={this.onChange} />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="radio"
                label="Planning"
                name="status"
              />
              <Form.Check
                type="radio"
                label="In progress"
                name="status"
              />
              <Form.Check
                type="radio"
                label="Completed"
                name="status"
              />
            </Form.Group>
            {/*<ColorPicker />*/}

            <Form.Group controlId="dueTo">
              <Form.Label>Due to</Form.Label>
              <Form.Control
                name="dueTo"
                autoComplete="off"
                value={this.state.dueTo}
                onChange={this.onChange} />
            </Form.Group>

            <Button className="btn-wide" variant="primary" type="submit">Save</Button>
          </Form>
        </Collapsible>
      </Container>
    )
  }
}

export default Sidebar
