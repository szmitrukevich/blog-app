import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import classes from './AuthorCard.module.scss'

const AuthorCard = ({ created, author }) => {
  const createdDate = created && format(new Date(created), 'MMMM d, yyyy')
  const { username, image } = author
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.name}>{username}</div>
        <div className={classes.date}>{createdDate}</div>
      </div>
      <div className={classes.container}>
        <img
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = 'https://i.ibb.co/3hcBXPz/a42bcb5c-9140-4967-bd3d-385842c4e42d.jpg'
          }}
          alt="avatar"
        />
      </div>
    </div>
  )
}

export default AuthorCard

AuthorCard.defaultProps = {
  created: null,
  author: {},
}

AuthorCard.propTypes = {
  created: PropTypes.string,
  author: PropTypes.shape(),
}
