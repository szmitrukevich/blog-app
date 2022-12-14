import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './LikeBtn.module.scss'
import { likeArticle, unlikeArticle } from '../../../redux/store/asyncDataReducer'

const LikeBtn = ({ favoritesCount, favorited, slug, isAuthorized, token, like, unlike }) => {
  useEffect(() => {}, [isAuthorized, favoritesCount])
  const btn = (func, text) => {
    return (
      <button
        type="button"
        onClick={func}
        className={classes.button}
      >
        {text}
      </button>
    )
  }
  const likeBtn = favorited
    ? btn(() => unlike(slug, token), `❤️  ${favoritesCount}`)
    : btn(() => like(slug, token), `♡  ${favoritesCount}`)
  return localStorage.isAuthorized ? likeBtn : <Link to="/sign-in">{likeBtn}</Link>
}
LikeBtn.defaultProps = {
  favoritesCount: 0,
  favorited: false,
  slug: null,
  isAuthorized: 'false',
  token: '',
  like: () => null,
  unlike: () => null,
}

LikeBtn.propTypes = {
  favoritesCount: PropTypes.number,
  favorited: PropTypes.bool,
  slug: PropTypes.string,
  isAuthorized: PropTypes.bool,
  token: PropTypes.string,
  like: PropTypes.func,
  unlike: PropTypes.func,
}
function mapStateToProps(state) {
  return { isAuthorized: state.data.isAuthorized, token: state.data.token }
}

function mapDispatchToProps(dispatch) {
  return {
    like: (id, token) => dispatch(likeArticle(id, token)),
    unlike: (id, token) => dispatch(unlikeArticle(id, token)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LikeBtn)
