import React, {Component} from 'react'
import Collapsible from 'react-collapsible';
import Container from 'react-bootstrap/Container'

class Sidebar extends Component {
  render() {
    return (
      <Container className="mt-25">
        <Collapsible trigger="Create new" triggerTagName="button" easing="cubic-bezier(.25,.8,.25,1)">
          <p>This is the collapsible content. It can be any element or React component you like.</p>
          <p>It can even be another Collapsible component. Check out the next section!</p>
        </Collapsible>
      </Container>
    )
  }
}

export default Sidebar
