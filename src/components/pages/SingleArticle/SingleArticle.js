import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getArticle } from '../../../redux/store/asyncDataReducer'
import classes from './SingleArticle.module.scss'
import Article from '../../ui/Article'
import ErrorMessage from '../../ui/ErrorMessage'

const SingleArticle = ({ article, error, getCurrentArticle, token }) => {
  const { id } = useParams()
  const { body, ...props } = article
  useEffect(() => {
    getCurrentArticle(id, token)
    return () => getCurrentArticle(null)
  }, [id, error])

  const errorMessage = error.message && <ErrorMessage />

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
  token: '',
}

SingleArticle.propTypes = {
  getCurrentArticle: PropTypes.func,
  article: PropTypes.shape(),
  error: PropTypes.shape(),
  token: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    article: state.data.currentArticle,
    error: state.data.error,
    token: state.data.token,
  }
}

function mapDispatchToProps(dispatch) {
  return { getCurrentArticle: (id, token) => dispatch(getArticle(id, token)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle)
