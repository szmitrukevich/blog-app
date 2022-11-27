import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './antd.css'
import classes from './App.module.scss'
import ArticleList from '../ArticleList'
import Header from '../Header/Header'
import NotFoundPage from '../NotFoundPage'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

const App = () => (
  <div className={classes.app}>
    <Header />
    <Routes>
      <Route
        path="/"
        element={<ArticleList />}
      />
      <Route
        path="/articles"
        element={<ArticleList />}
      />
      <Route
        path="/signIn"
        element={<SignIn />}
      />
      <Route
        path="/signUp"
        element={<SignUp />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  </div>
)

export default App
