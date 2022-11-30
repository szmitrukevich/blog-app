import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './redux/store'
import './index.module.scss'
import App from './components/App'

const container = document.querySelector('.blog')
const root = createRoot(container)
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
