import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { deleteArticle } from '../../../redux/store/asyncDataReducer'
import classes from './AuthorCard.module.scss'

const AuthorCard = ({ createdAt, author, slug, deleteCurrentArticle, token, full, changedApplied, currentUser }) => {
  const createdDate = createdAt && format(new Date(createdAt), 'MMMM d, yyyy')
  const { username, image } = author
  if (changedApplied && full) {
    return (
      <Navigate
        push
        to="/"
      />
    )
  }
  const [showModal, setShowModal] = useState(false)

  const buttons =
    username === currentUser.username && full ? (
      <div className={classes.buttons}>
        <button
          type="button"
          className={classes.delete}
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
        <Link to={`/articles/${slug}/edit`}>
          <button
            type="button"
            className={classes.edit}
          >
            Edit
          </button>
        </Link>
      </div>
    ) : null

  const modalBtns = (
    <div className={classes.modalBtns}>
      <button
        type="button"
        className={classes.modalNo}
        onClick={() => setShowModal(false)}
      >
        No
      </button>
      <button
        type="button"
        className={classes.modalYes}
        onClick={() => {
          deleteCurrentArticle(slug, token)
        }}
      >
        Yes
      </button>
    </div>
  )
  const modalWarning = showModal && (
    <div className={classes.modal}>
      <div className={classes.message}>Are you sure to delete this article?</div>
      {modalBtns}
    </div>
  )

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.author}>
          <div className={classes.name}>{username}</div>
          <div className={classes.date}>{createdDate}</div>
        </div>
        <img
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = 'https://static.productionready.io/images/smiley-cyrus.jpg'
          }}
          alt="avatar"
        />
      </div>
      {buttons}
      {modalWarning}
    </div>
  )
}

AuthorCard.defaultProps = {
  createdAt: null,
  author: {},
  slug: '',
  deleteCurrentArticle: () => null,
  token: '',
  full: false,
  changedApplied: true,
  currentUser: {},
}

AuthorCard.propTypes = {
  createdAt: PropTypes.string,
  author: PropTypes.shape(),
  slug: PropTypes.string,
  deleteCurrentArticle: PropTypes.func,
  token: PropTypes.string,
  full: PropTypes.bool,
  changedApplied: PropTypes.bool,
  currentUser: PropTypes.shape(),
}
function mapStateToProps(state) {
  return { token: state.data.token, changedApplied: state.data.succChanged, currentUser: state.data.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { deleteCurrentArticle: (id, token) => dispatch(deleteArticle(id, token)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorCard)
