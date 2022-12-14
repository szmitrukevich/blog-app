import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import { updateArticle, getArticle } from '../../../redux/store/asyncDataReducer'
import classes from './EditArticle.module.scss'
import ErrorMessage from '../../ui/ErrorMessage'
import SubmitBtn from '../../ui/SubmitBtn'

const EditArticle = ({
  article,
  getCurrentArticle,
  updateCurrArticle,
  error,
  token,
  changedApplied,
  isAuthorized,
  currentUser,
}) => {
  const { id } = useParams()
  console.log(currentUser.username)
  const { body, description, title, tagList: defaultTags } = article
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

  const [tags, setTags] = useState(defaultTags || [])
  const [tag, setTag] = useState('')

  useEffect(() => {
    getCurrentArticle(id)
    return () => getCurrentArticle(null)
  }, [tags.length, id])

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
      defaultValue: title,
    },
    {
      type: 'text',
      id: 'description',
      title: 'Short description',
      placeholder: 'Description',
      defaultValue: description,
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
          defaultValue={label.defaultValue}
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
          updateCurrArticle(id, { article: { ...data, tagList: tags } }, token)
        })}
      >
        <h1 className={classes.title}>Edit article</h1>
        {labels}
        <label
          className={classes.label}
          htmlFor="text"
        >
          Text
          <textarea
            id="text"
            className={classes.text}
            defaultValue={body}
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

EditArticle.defaultProps = {
  error: {},
  article: {},
  updateCurrArticle: () => null,
  getCurrentArticle: () => null,
  token: '',
  changedApplied: false,
  isAuthorized: false,
  currentUser: {},
}

EditArticle.propTypes = {
  error: PropTypes.shape(),
  article: PropTypes.shape(),
  updateCurrArticle: PropTypes.func,
  getCurrentArticle: PropTypes.func,
  token: PropTypes.string,
  changedApplied: PropTypes.bool,
  isAuthorized: PropTypes.bool,
  currentUser: PropTypes.shape(),
}

function mapStateToProps(state) {
  return {
    token: state.data.token,
    changedApplied: state.data.succChanged,
    isAuthorized: state.data.isAuthorized,
    article: state.data.currentArticle,
    currentUser: state.data.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateCurrArticle: (id, body, token) => dispatch(updateArticle(id, body, token)),
    getCurrentArticle: (id) => dispatch(getArticle(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle)
