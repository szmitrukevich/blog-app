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
import { USERNAME_REGEXP } from '../../assets/constants/regexpConstants'

const Profile = ({ updateUserInfo, error, token }) => {
  const [saved, setSaved] = useState(false)
  const schema = yup.object().shape(
    {
      username: yup
        .string()
        .required('Please enter username')
        .matches(USERNAME_REGEXP, 'Only Latin characters')
        .min(3, 'Username length should be at least 3 characters')
        .max(20, 'Username cannot exceed more than 20 characters'),
      email: yup.string().required('Email is required').email('Is not in correct format'),
      password: yup
        .string()
        .nullable()
        .notRequired()
        .when('password', {
          is: (value) => value?.length,
          then: (rule) =>
            rule
              .min(6, 'Password length should be at least 6 characters')
              .max(40, 'Password cannot exceed more than 40 characters'),
        }),
      image: yup.string().url('Is not in correct format'),
    },
    [['password', 'password']]
  )
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
      id: 'image',
      title: 'Avatar image(url)',
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
  const setUpdatedLabels = (obj) => {
    const updatedLabels = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(obj)) {
      if (obj[key]) {
        updatedLabels[`${key}`] = obj[key]
      }
      if (key === 'email') {
        updatedLabels[`${key}`] = obj[key].toLowerCase()
      }
    }
    return { user: updatedLabels }
  }
  return (
    <div className={classes.wrapper}>
      {errorMessage}
      <form
        className={classes.form}
        onSubmit={handleSubmit((data) => {
          updateUserInfo(setUpdatedLabels(data), token)
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

Profile.defaultProps = { error: {}, updateUserInfo: () => null, token: '' }

Profile.propTypes = { error: PropTypes.shape(), updateUserInfo: PropTypes.func, token: PropTypes.string }

function mapStateToProps(state) {
  return { token: state.data.token }
}

function mapDispatchToProps(dispatch) {
  return { updateUserInfo: (info, token) => dispatch(updateProfile(info, token)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
