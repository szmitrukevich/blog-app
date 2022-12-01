import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import { updateProfile } from '../../redux/store/asyncDataReducer'
import classes from './Profile.module.scss'
import SubmitBtn from '../SubmitBtn'
import ErrorMessage from '../ErrorMessage'

const Profile = ({ updateUserInfo, error }) => {
  const [saved, setSaved] = useState(false)
  const profile = localStorage.profile && JSON.parse(localStorage.profile)
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
  const URL_REGEXP = /[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)?/gi
  const schema = yup.object({
    username: yup
      .string()
      .required('Please enter username')
      .min(3, 'Username length should be at least 3 characters')
      .max(20, 'Username cannot exceed more than 20 characters'),
    email: yup.string().required('Email is required').matches(EMAIL_REGEXP, 'Is not in correct format'),
    password: yup
      .string()
      .min(6, 'Password length should be at least 6 characters')
      .max(40, 'Password cannot exceed more than 40 characters'),
    avatar: yup.string().matches(URL_REGEXP, 'Is not in correct format'),
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
      placeholder: 'New username',
    },
    {
      type: 'email',
      id: 'email',
      title: 'Email address',
      placeholder: 'New email address',
    },
    {
      type: 'password',
      id: 'password',
      title: 'Password',
      placeholder: 'New password',
    },
    {
      type: 'url',
      id: 'avatar',
      title: 'Avatar',
      placeholder: 'Avatar image',
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
  if (saved) {
    return (
      <Navigate
        push
        to="/"
      />
    )
  }
  const labels = labelList.map((item) => createLabel(item))
  const errorMessage = error.isError && error.status !== '422' && <ErrorMessage />
  const cantCreateNewUser = error.status === '422' && <p className={classes.warning}>Email already taken</p>
  return (
    <div className={classes.wrapper}>
      {errorMessage}
      <form
        className={classes.form}
        onSubmit={handleSubmit((data) => {
          console.log(
            {
              user: {
                username: data.username,
                email: data.email.toLowerCase(),
                password: data.password,
                image: data.image,
              },
            },
            profile.token
          )
          if (!error.isError) setSaved(true)
        })}
      >
        <h1 className={classes.title}>Edit Profile</h1>
        {labels}
        <SubmitBtn text="Save" />
        <span className={classes.text}>{cantCreateNewUser}</span>
      </form>
    </div>
  )
}

Profile.defaultProps = { error: {}, updateUserInfo: () => null }

Profile.propTypes = { error: PropTypes.shape(), updateUserInfo: PropTypes.func }

function mapDispatchToProps(dispatch) {
  return { updateUserInfo: (info) => dispatch(updateProfile(info)) }
}

export default connect(null, mapDispatchToProps)(Profile)
