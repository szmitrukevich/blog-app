import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './LikeBtn.module.scss'

const LikeBtn = ({ likes, favorited, slug, isAuthorized }) => {
  useEffect(() => {}, [isAuthorized])
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
  return localStorage.isAuthorized ? btn : <Link to="/sign-in">{btn}</Link>
}
LikeBtn.defaultProps = { likes: 0, favorited: false, slug: null, isAuthorized: 'false' }

LikeBtn.propTypes = {
  likes: PropTypes.number,
  favorited: PropTypes.bool,
  slug: PropTypes.string,
  isAuthorized: PropTypes.bool,
}
function mapStateToProps(state) {
  return { isAuthorized: state.data.isAuthorized }
}
export default connect(mapStateToProps)(LikeBtn)
