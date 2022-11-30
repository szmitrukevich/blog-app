import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classes from './SignIn.module.scss'
import SubmitBtn from '../SubmitBtn'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
  const email = 'email'
  const password = 'password'
  return (
    <div className={classes.wrapper}>
      <form
        className={classes.form}
        onSubmit={handleSubmit((x) => {
          console.log(x)
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

export default SignIn

SignIn.defaultProps = { onSubmit: () => null }

SignIn.propTypes = { onSubmit: PropTypes.func }
