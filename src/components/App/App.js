import React from 'react'
import { Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.min.css'
import './Pagination.scss'
import classes from './App.module.scss'
import ArticleList from '../ArticleList'
import Header from '../Header/Header'
import SingleArticle from '../SingleArticle'
import NotFoundPage from '../NotFoundPage'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import Profile from '../Profile/Profile'
import NewArticle from '../NewArticle'

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
        path="/articles/:id"
        element={<SingleArticle />}
      />
      <Route
        path="/sign-in"
        element={<SignIn />}
      />
      <Route
        path="/sign-up"
        element={<SignUp />}
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/new-article"
        element={<NewArticle />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  </div>
)

export default App
