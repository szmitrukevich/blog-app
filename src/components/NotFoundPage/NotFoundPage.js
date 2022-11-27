import React from 'react'
import { Link } from 'react-router-dom'
import classes from './NotFoundPage.module.scss'

const NotFoundPage = () => {
  return (
    <div className={classes.wrapper}>
      Page not found :(
      <Link to="/">Go back to main page</Link>
    </div>
  )
}

export default NotFoundPage
