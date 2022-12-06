import React from 'react'
import PropTypes from 'prop-types'
import classes from './TagForm.module.scss'

const TagForm = ({ text }) => {
  return (
    <input
      type="submit"
      className={classes.btn}
      value={text}
    />
  )
}

export default TagForm

TagForm.defaultProps = { text: '' }

TagForm.propTypes = { text: PropTypes.string }
