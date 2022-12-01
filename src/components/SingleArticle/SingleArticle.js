import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getArticle } from '../../redux/store/asyncDataReducer'
import classes from './SingleArticle.module.scss'
import Article from '../Article'
import ErrorMessage from '../ErrorMessage'

const SingleArticle = ({ article, error, getCurrentArticle }) => {
  const { id } = useParams()
  const { body, ...props } = article
  useEffect(() => {
    getCurrentArticle(id)
    return () => getCurrentArticle(null)
  }, [id, error])

  const errorMessage = error.isError && error.status !== '422' && <ErrorMessage />

  return (
    <div className={classes.wrapper}>
      <Article
        {...props}
        full
      />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      {errorMessage}
    </div>
  )
}

SingleArticle.defaultProps = {
  getCurrentArticle: () => {},
  article: { body: null },
  error: {},
}

SingleArticle.propTypes = {
  getCurrentArticle: PropTypes.func,
  article: PropTypes.shape(),
  error: PropTypes.shape(),
}

function mapStateToProps(state) {
  return {
    article: state.data.currentArticle,
    error: state.data.error,
  }
}

function mapDispatchToProps(dispatch) {
  return { getCurrentArticle: (id) => dispatch(getArticle(id)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle)
