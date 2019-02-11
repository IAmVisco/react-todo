import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import Signup from './Signup'
import Login from './Login'
import {Route, BrowserRouter as Router} from 'react-router-dom'


const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
