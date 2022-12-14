import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import { createArticle } from '../../../redux/store/asyncDataReducer'
import classes from './NewArticle.module.scss'
import ErrorMessage from '../../ui/ErrorMessage'
import SubmitBtn from '../../ui/SubmitBtn'

const NewArticle = ({ createNewArticle, error, token, changedApplied, isAuthorized }) => {
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

  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')

  useEffect(() => {}, [tags.length])

  const handleChange = (event) => {
    setTag(event.target.value)
  }

  const handleClick = () => {
    if (tag) {
      setTag('')
      setTags((prev) => [...prev, tag])
    }
  }

  const deleteTag = (item) => setTags((prev) => prev.filter((tg) => item !== tg))

  const tagList = tags.map((item) => {
    return (
      <div
        className={classes.tagList}
        key={uuidv4()}
      >
        <input
          className={classes.input}
          type="text"
          value={item}
          readOnly
        />
        <button
          type="button"
          className={classes.deleteTag}
          onClick={() => deleteTag(item)}
        >
          Delete
        </button>
      </div>
    )
  })
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
  if (changedApplied) {
    return (
      <Navigate
        push
        to="/"
      />
    )
  }
  if (isAuthorized === false) {
    return (
      <Navigate
        push
        to="/sign-in"
      />
    )
  }
  const labels = labelList.map((item) => createLabel(item))
  const textError = errors.body && <p className={classes.warning}>{errors.body?.message}</p>
  const errorMessage = error.message && <ErrorMessage />

  return (
    <div className={classes.wrapper}>
      {errorMessage}
      <form
        className={classes.form}
        onSubmit={handleSubmit((data) => {
          createNewArticle({ article: { ...data, tagList: tags } }, token)
        })}
      >
        <h1 className={classes.title}>Create new article</h1>
        {labels}
        <label
          className={classes.label}
          htmlFor="text"
        >
          Text
          <textarea
            id="text"
            className={classes.text}
            placeholder="Text"
            {...register('body')}
            style={{ borderColor: errors.body ? 'red' : '#D9D9D9' }}
          />
          {textError}
        </label>
        <label
          className={`${classes.label} ${classes.tags}`}
          htmlFor="tags"
        >
          Tags
          {tagList}
          <div className={classes.container}>
            <input
              type="text"
              className={classes.input}
              placeholder="Tag"
              id="tags"
              onChange={handleChange}
              value={tag}
            />
            <button
              type="button"
              className={classes.deleteTag}
              onClick={() => setTag('')}
            >
              Delete
            </button>
            <button
              type="button"
              className={classes.addTag}
              onClick={handleClick}
            >
              Add tag
            </button>
          </div>
          <SubmitBtn text="Send" />
        </label>
      </form>
    </div>
  )
}

NewArticle.defaultProps = {
  error: {},
  createNewArticle: () => null,
  token: '',
  changedApplied: false,
  isAuthorized: false,
}

NewArticle.propTypes = {
  error: PropTypes.shape(),
  createNewArticle: PropTypes.func,
  token: PropTypes.string,
  changedApplied: PropTypes.bool,
  isAuthorized: PropTypes.bool,
}

function mapStateToProps(state) {
  return { token: state.data.token, changedApplied: state.data.succChanged, isAuthorized: state.data.isAuthorized }
}

function mapDispatchToProps(dispatch) {
  return { createNewArticle: (info, token) => dispatch(createArticle(info, token)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle)
