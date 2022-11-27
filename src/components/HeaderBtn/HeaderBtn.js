import React from 'react'
import PropTypes from 'prop-types'
import classes from './HeaderBtn.module.scss'

const HeaderBtn = ({ text, btnStyle }) => {
  return (
    <button
      type="button"
      className={classes[btnStyle]}
    >
      {text}
    </button>
  )
}

export default HeaderBtn

HeaderBtn.defaultProps = { text: '', btnStyle: '' }

HeaderBtn.propTypes = { text: PropTypes.string, btnStyle: PropTypes.string }
