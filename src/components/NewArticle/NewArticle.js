import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createArticle } from '../../redux/store/asyncDataReducer'
import classes from './NewArticle.module.scss'
import ErrorMessage from '../ErrorMessage'
import SubmitBtn from '../SubmitBtn'

const NewArticle = ({ createNewArticle, error, token, changed }) => {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter title'),
    description: yup.string().required('Please enter description'),
    body: yup.string().required('Please enter text'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const labelList = [
    {
      type: 'text',
      id: 'title',
      title: 'Title',
      placeholder: 'Title',
    },
    {
      type: 'text',
      id: 'description',
      title: 'Short description',
      placeholder: 'Description',
    },
    {
      type: 'text',
      id: 'body',
      title: 'Text',
      placeholder: 'Text',
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
  if (changed) {
    return (
      <Navigate
        push
        to="/"
      />
    )
  }
  const labels = labelList.map((item) => createLabel(item))
  const errorMessage = error.isError && error.status !== '422' && <ErrorMessage />
  return (
    <div className={classes.wrapper}>
      {errorMessage}
      <form
        className={classes.form}
        onSubmit={handleSubmit((data) => {
          console.log(data)
          // createNewArticle({ article: { data } }, token)
        })}
      >
        <h1 className={classes.title}>Create new article</h1>
        {labels}
        <SubmitBtn text="Send" />
      </form>
    </div>
  )
}

NewArticle.defaultProps = { error: {}, createNewArticle: () => null, token: '', changed: false }

NewArticle.propTypes = {
  error: PropTypes.shape(),
  createNewArticle: PropTypes.func,
  token: PropTypes.string,
  changed: PropTypes.bool,
}

function mapStateToProps(state) {
  return { token: state.data.token, changed: state.data.succChanged }
}

function mapDispatchToProps(dispatch) {
  return { createNewArticle: (info, token) => dispatch(createArticle(info, token)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle)
