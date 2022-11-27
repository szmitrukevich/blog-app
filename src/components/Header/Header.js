import React from 'react'
import PropTypes from 'prop-types'
import { Link, Outlet } from 'react-router-dom'
import classes from './Header.module.scss'
import HeaderBtn from '../HeaderBtn'

const Header = ({ isSigned, profile }) => {
  console.log(profile)
  const btnList = [
    {
      link: '/createArticle',
      style: 'createArticle',
      text: 'Create Article',
    },
    {
      link: '/profile',
      style: 'profile',
      text: 'Name',
      avatar: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    },
    {
      link: '',
      style: 'logOut',
      text: 'Log out',
    },
    {
      link: '/signIn',
      style: 'signIn',
      text: 'Sign In',
    },
    {
      link: '/signUp',
      style: 'signUp',
      text: 'Sign Up',
    },
  ]

  const createBtn = (btn) => (
    <Link
      to={btn.link}
      key={btn.style}
    >
      <HeaderBtn
        text={btn.text}
        btnStyle={btn.style}
      />
    </Link>
  )
  const buttons = isSigned
    ? btnList.slice(0, 3).map((item) => createBtn(item))
    : btnList.slice(3).map((item) => createBtn(item))

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Link to="/">
            <button
              type="button"
              className={classes.btn}
            >
              Realworld Blog
            </button>
          </Link>
        </div>
        <div className={classes.container}>{buttons}</div>
      </div>
      <Outlet />
    </>
  )
}

export default Header

Header.defaultProps = {
  isSigned: false,
  profile: {},
}

Header.propTypes = {
  isSigned: PropTypes.bool,
  profile: PropTypes.shape(),
}
