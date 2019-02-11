import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import Signup from './Signup'
import Login from './Login'
import Logout from './Logout'
import Home from './Home'
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom'

const routing = (
  <Router>
    <div>
      <Route exact path="/" render={() => (
        localStorage.getItem('authToken') ? <Redirect to="/app" /> : <Home />
      )} />
      <Route path="/app" component={App} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
