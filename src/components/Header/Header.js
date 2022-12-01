import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, Outlet } from 'react-router-dom'
import { toggleAuthorization } from '../../redux/actions/apiActions'
import classes from './Header.module.scss'
import HeaderBtn from '../HeaderBtn'

const Header = ({ toggleAuth, isAuthorized }) => {
  useEffect(() => {}, [isAuthorized])
  const profile = localStorage.profile && JSON.parse(localStorage.profile)
  console.log(profile)
  const btnList = [
    {
      link: '/new-article',
      style: 'createArticle',
      text: 'Create Article',
    },
    {
      link: '/profile',
      style: 'profile',
      text: profile?.usermane || null,
      avatar: profile?.avatar || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    },
    {
      link: '',
      style: 'logOut',
      text: 'Log out',
      onClick: () => {
        localStorage.clear()
        return toggleAuth(false)
      },
    },
    {
      link: '/sign-in',
      style: 'signIn',
      text: 'Sign In',
    },
    {
      link: '/sign-up',
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
        onClick={btn.onClick}
      />
    </Link>
  )
  const buttons = localStorage.isAuthorized
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

Header.defaultProps = {
  toggleAuth: () => {},
  isAuthorized: 'false',
}

Header.propTypes = {
  toggleAuth: PropTypes.func,
  isAuthorized: PropTypes.string,
}

function mapStateToProps(state) {
  return { isAuthorized: state.data.isAuthorized }
}

function mapDispatchToProps(dispatch) {
  return { toggleAuth: (isLoginned) => dispatch(toggleAuthorization(isLoginned)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
