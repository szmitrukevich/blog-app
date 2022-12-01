import React from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import { login } from '../../redux/store/asyncDataReducer'
import classes from './SignIn.module.scss'
import SubmitBtn from '../SubmitBtn'
import ErrorMessage from '../ErrorMessage'

const SignIn = ({ error, logIn, isAuthorized }) => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  const schema = yup.object({
    email: yup.string().required('Email is required').matches(EMAIL_REGEXP, 'Is not in correct format'),
    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'Password length should be at least 6 characters')
      .max(40, 'Password cannot exceed more than 40 characters'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const labelList = [
    {
      type: 'email',
      id: 'email',
      title: 'Email address',
      placeholder: 'Email address',
    },
    {
      type: 'password',
      id: 'password',
      title: 'Password',
      placeholder: 'Password',
    },
  ]
  const createLabel = (label) => {
    const labelError = errors[label.id] && <p className={classes.warning}>{errors[label.id]?.message}</p>
    return (
      <label
        className={classes.label}
        htmlFor={label.id}
        key={label.id}
      >
        {label.title}
        <input
          type={label.type}
          {...register(`${label.id}`)}
          style={{ borderColor: errors[label.id] ? 'red' : '#D9D9D9' }}
          className={classes.input}
          placeholder={label.placeholder}
          id={label.id}
        />
        {labelError}
      </label>
    )
  }
  const labels = labelList.map((item) => createLabel(item))

  if (isAuthorized) {
    return (
      <Navigate
        push
        to="/"
      />
    )
  }
  const noLogin = error.status === '422' && <p className={classes.warning}>Wrong login or password</p>

  const errorMessage = error.isError && error.status !== '422' && <ErrorMessage />
  return (
    <div className={classes.wrapper}>
      {errorMessage}
      <form
        className={classes.form}
        onSubmit={handleSubmit((data) => {
          logIn({ user: { ...data, email: data.email.toLowerCase() } })
        })}
      >
        <h1 className={classes.title}>Sign In</h1>
        {labels}
        <SubmitBtn text="Login" />
        <span className={classes.text}>
          {noLogin}
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

SignIn.defaultProps = { error: {}, logIn: () => null, isAuthorized: false }

SignIn.propTypes = { error: PropTypes.shape(), logIn: PropTypes.func, isAuthorized: PropTypes.bool }

function mapStateToProps(state) {
  return { error: state.data.error, isAuthorized: state.data.isAuthorized }
}

function mapDispatchToProps(dispatch) {
  return { logIn: (info) => dispatch(login(info)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
