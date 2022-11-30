import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classes from './LikeBtn.module.scss'

const LikeBtn = ({ likes, favorited, slug, isAuthorized }) => {
  const onClick = (x) => console.log(x)
  const like = favorited ? `❤️  ${likes}` : `♡  ${likes}`
  const btn = (
    <button
      type="button"
      onClick={() => onClick(slug)}
      className={classes.button}
    >
      {like}
    </button>
  )
  return isAuthorized ? btn : <Link to="/sign-in">{btn}</Link>
}

export default LikeBtn

LikeBtn.defaultProps = { likes: 0, favorited: false, slug: null, isAuthorized: false }

LikeBtn.propTypes = {
  likes: PropTypes.number,
  favorited: PropTypes.bool,
  slug: PropTypes.string,
  isAuthorized: PropTypes.bool,
}
