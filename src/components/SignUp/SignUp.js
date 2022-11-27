/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classes from './SignUp.module.scss'
import SubmitBtn from '../SubmitBtn'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const labelList = [
    {
      type: 'text',
      id: 'username',
      title: 'Username',
      placeholder: 'Username',
      errorMsg: 'Username must be between 3 and 20 characters',
    },
    {
      type: 'email',
      id: 'email',
      title: 'Email address',
      placeholder: 'Email address',
      errorMsg: 'Enter correct email',
    },
    {
      type: 'password',
      id: 'password',
      title: 'Password',
      placeholder: 'Password',
      errorMsg: 'Username must be between 6 and 40 characters',
    },
    {
      type: 'password',
      id: 'repPass',
      title: 'Repeat Password',
      placeholder: 'Password',
      errorMsg: 'Passwords must match',
    },
  ]
  const createLabel = (label) => {
    return (
      <label
        className={classes.label}
        htmlFor={label.id}
      >
        {label.title}
        <input
          type={label.type}
          {...register(`${label.id}`, { required: `${label.errorMsg}` })}
          style={{ borderColor: errors[label.id] ? 'red' : '#D9D9D9' }}
          className={classes.input}
          placeholder={label.placeholder}
          id={label.id}
        />
        <p className={classes.warning}>{errors[label.id]?.message}</p>
      </label>
    )
  }
  const signUpCheck = 'signUpCheck'
  const labels = labelList.map((item) => createLabel(item))
  return (
    <div className={classes.wrapper}>
      <form
        className={classes.form}
        onSubmit={handleSubmit((x) => {
          console.log(x)
        })}
      >
        <h1 className={classes.title}>Create new account</h1>
        {labels}
        <span className={classes.item}>
          <input
            id={signUpCheck}
            type="checkbox"
            value="signUpCheck"
            className={classes.checkbox}
          />
          <label htmlFor={signUpCheck}>I agree to the processing of my personal information</label>
        </span>
        <SubmitBtn text="Create" />
        <span className={classes.text}>
          Already have an account?
          <Link to="/signIn"> Sign In</Link>
        </span>
      </form>
    </div>
  )
}

export default SignUp

SignUp.defaultProps = { onSubmit: () => null }

SignUp.propTypes = { onSubmit: PropTypes.func }
