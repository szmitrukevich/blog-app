import React from 'react'
import PropTypes from 'prop-types'
import classes from './SubmitBtn.module.scss'

const SubmitBtn = ({ text }) => {
  return (
    <input
      type="submit"
      className={classes.btn}
      value={text}
    />
  )
}

export default SubmitBtn

SubmitBtn.defaultProps = { text: '' }

SubmitBtn.propTypes = { text: PropTypes.string }
