import React from 'react'
import PropTypes from 'prop-types'
import classes from './LikeBtn.module.scss'

const LikeBtn = ({ likes, favorited, slug, isAuthorized }) => {
  const onClick = (x) => console.log(x)
  const like = favorited ? `❤️  ${likes}` : `♡  ${likes}`
  const btn = isAuthorized ? (
    <button
      type="button"
      onClick={() => onClick(slug)}
      className={classes.button}
    >
      {like}
    </button>
  ) : null
  return btn
}

fgdfg
export default LikeBtn

LikeBtn.defaultProps = { likes: 0, favorited: false, slug: null, isAuthorized: false }

LikeBtn.propTypes = {
  likes: PropTypes.number,
  favorited: PropTypes.bool,
  slug: PropTypes.string,
  isAuthorized: PropTypes.bool,
}
