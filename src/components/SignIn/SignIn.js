import React from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { login } from '../../redux/store/asyncDataReducer'
import classes from './SignIn.module.scss'
import SubmitBtn from '../SubmitBtn'
import ErrorMessage from '../ErrorMessage'

const SignIn = ({ error, getCurrentUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
  const email = 'email'
  const password = 'password'
  const noLogin = error.status === '422' && <p className={classes.warning}>Неверный логин или пароль</p>

  const errorMessage = error.isError && error.status !== '422' && <ErrorMessage />
  return (
    <div className={classes.wrapper}>
      {errorMessage}
      <form
        className={classes.form}
        onSubmit={handleSubmit((data) => {
          getCurrentUser({ user: data })
        })}
      >
        <h1 className={classes.title}>Sign In</h1>
        <label
          className={classes.label}
          htmlFor={email}
        >
          Email address
          <input
            type="email"
            {...register('email', {
              required: 'Enter correct email',

              pattern: {
                value: EMAIL_REGEXP,
                message: 'Enter correct email',
              },
            })}
            style={{ borderColor: errors.email ? 'red' : '#D9D9D9' }}
            className={classes.input}
            placeholder="Email address"
            id={email}
          />
          <p className={classes.warning}>{errors.email?.message}</p>
        </label>
        <label
          className={classes.label}
          htmlFor={password}
        >
          Password
          <input
            type="password"
            {...register('password', { required: 'Enter password' })}
            style={{ borderColor: errors.password ? 'red' : '#D9D9D9' }}
            className={classes.input}
            placeholder="Password"
            id={password}
          />
          <p className={classes.warning}>{errors.password?.message}</p>
        </label>
        {noLogin}
        <SubmitBtn text="Login" />
        <span className={classes.text}>
          Don`t have an account?
          <Link
            to="/sign-up"
            className={classes.link}
          >
            {' '}
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  )
}

SignIn.defaultProps = { error: {}, getCurrentUser: () => null }

SignIn.propTypes = { error: PropTypes.shape(), getCurrentUser: PropTypes.func }

function mapStateToProps(state) {
  return { error: state.data.error }
}

function mapDispatchToProps(dispatch) {
  return { getCurrentUser: (info) => dispatch(login(info)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
