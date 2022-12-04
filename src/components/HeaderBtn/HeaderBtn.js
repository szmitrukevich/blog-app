import React from 'react'
import PropTypes from 'prop-types'
import classes from './HeaderBtn.module.scss'

const HeaderBtn = ({ text, btnStyle, onClick, avatar }) => {
  const img = btnStyle === 'profile' && (
    <img
      src={avatar}
      className={classes.img}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = 'https://i.ibb.co/3hcBXPz/a42bcb5c-9140-4967-bd3d-385842c4e42d.jpg'
      }}
      alt="avatar"
    />
  )
  return (
    <button
      type="button"
      className={classes[btnStyle]}
      onClick={onClick}
    >
      {text}
      {img}
    </button>
  )
}

export default HeaderBtn

HeaderBtn.defaultProps = { text: '', btnStyle: '', onClick: () => null, avatar: '' }

HeaderBtn.propTypes = {
  text: PropTypes.string,
  btnStyle: PropTypes.string,
  onClick: PropTypes.func,
  avatar: PropTypes.string,
}
