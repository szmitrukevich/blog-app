import React from 'react'
import { Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.min.css'
import './Pagination.scss'
import classes from './App.module.scss'
import ArticleList from '../pages/ArticleList'
import Header from '../pages/Header'
import SingleArticle from '../pages/SingleArticle'
import NotFoundPage from '../pages/NotFoundPage'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Profile from '../pages/Profile/Profile'
import NewArticle from '../pages/NewArticle'
import EditArticle from '../pages/EditArticle'

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
        path="/articles/:id/edit"
        element={<EditArticle />}
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
