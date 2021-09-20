import { useState, useEffect, createContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider as AlertProvider } from 'react-alert'

import { requestApi } from './api.js'
import { Path } from './Path/index.js'
import { Paths } from './Paths/index.js'
import style from './App.module.css'

const AlertTemplate = ({ options, message }) => {
  const s = {
    info: style.alertInfo,
    success: style.alertSuccess,
    error: style.alertError
  }[options.type]
  return (
    <div className={s}>
      {message}
    </div>
  )
}

export const LoginContext = createContext()

const App = props => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginLoading, setLoginLoading] = useState(true)

  useEffect(() => {
    requestApi('/logged_in', 'GET').then(r => {
      setLoggedIn(r.logged_in)
      setLoginLoading(false)
    })
  }, [])

  return (
    <AlertProvider template={AlertTemplate} timeout={3000}>
      <LoginContext.Provider value={loggedIn}>
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Redirect to='/search'/>} />
            <Route exact path="/search" component={Paths} />
            <Route exact path="/path/:path" component={Path} />
          </Switch>
        </Router>
      </LoginContext.Provider>
    </AlertProvider>
  )
}
export default App

