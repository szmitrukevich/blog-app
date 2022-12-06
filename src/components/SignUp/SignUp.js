/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import { createNewAcc } from '../../redux/store/asyncDataReducer'
import classes from './SignUp.module.scss'
import SubmitBtn from '../../ui/SubmitBtn'
import ErrorMessage from '../../ui/ErrorMessage'
import { USERNAME_REGEXP } from '../../assets/constants/regexpConstants'

const SignUp = ({ isAuthorized, createAcc, error }) => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter username')
      .matches(USERNAME_REGEXP, 'Only Latin characters')
      .min(3, 'Username length should be at least 3 characters')
      .max(20, 'Username cannot exceed more than 20 characters'),
    email: yup.string().required('Email is required').email('Is not in correct format'),
    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'Password length should be at least 6 characters')
      .max(40, 'Password cannot exceed more than 40 characters'),
    repPass: yup
      .string()
      .required('Please repeat password')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
    signUpCheck: yup.bool().oneOf([true], 'You must agree to the processing of data'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const labelList = [
    {
      type: 'text',
      id: 'username',
      title: 'Username',
      placeholder: 'Username',
    },
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
    {
      type: 'password',
      id: 'repPass',
      title: 'Repeat Password',
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
  if (isAuthorized) {
    return (
      <Navigate
        push
        to="/"
      />
    )
  }
  const signUpCheck = 'signUpCheck'
  const labels = labelList.map((item) => createLabel(item))
  const errorMessage = error.message && <ErrorMessage />
  const usernameTaken = error.username && <p className={classes.warning}>Username already taken</p>
  const emailTaken = error.email && <p className={classes.warning}>Email already taken</p>
  return (
    <div className={classes.wrapper}>
      {errorMessage}
      <form
        className={classes.form}
        onSubmit={handleSubmit((data) => {
          createAcc({ user: { username: data.username, email: data.email.toLowerCase(), password: data.password } })
        })}
      >
        <h1 className={classes.title}>Create new account</h1>
        {labels}
        <span className={classes.item}>
          <input
            id={signUpCheck}
            type="checkbox"
            value
            {...register('signUpCheck')}
            className={classes.checkbox}
          />
          <label htmlFor={signUpCheck}>I agree to the processing of my personal information</label>
          <p className={classes.warning}>{errors.signUpCheck?.message}</p>
        </span>
        <SubmitBtn text="Create" />
        <span className={classes.text}>
          {usernameTaken}
          {emailTaken}
          Already have an account?
          <Link to="/sign-in"> Sign In</Link>
        </span>
      </form>
    </div>
  )
}

SignUp.defaultProps = { error: {}, createAcc: () => null, isAuthorized: false }

SignUp.propTypes = { error: PropTypes.shape(), createAcc: PropTypes.func, isAuthorized: PropTypes.bool }

function mapStateToProps(state) {
  return { error: state.data.error, isAuthorized: state.data.isAuthorized }
}

function mapDispatchToProps(dispatch) {
  return { createAcc: (info) => dispatch(createNewAcc(info)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
