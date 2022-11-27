import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import { Routes, Route, Link } from 'react-router-dom'
import { Spin } from 'antd'
import PropTypes from 'prop-types'
import { getArticles } from '../../store/asyncDataReducer'
import classes from './ArticleList.module.scss'
import Article from '../Article'
import ErrorMessage from '../ErrorMessage'
import Pagination from '../Pagination'

const ArticleList = ({ articlesData, isLoading, error, getArticlesData, totalPages }) => {
  const createArticle = (item) => (
    <Article
      author={item.author}
      text={item.body}
      created={item.createdAt}
      key={item.slug}
      title={item.title}
      tagList={item.tagList}
      likes={item.favoritesCount}
      slug={item.slug}
      favorited={item.favorited}
    />
  )

  let list = articlesData.map((article) => createArticle(article))

  useEffect(() => {
    getArticlesData()
  }, [articlesData, isLoading, error])

  const spinner = isLoading && (
    <div className={classes.spinner}>
      <Spin />
    </div>
  )

  let errorMessage
  if (error) {
    list = null
    errorMessage = <ErrorMessage />
  }
  return (
    <div className={classes.wrapper}>
      {spinner}
      {list}
      {errorMessage}
      <Pagination total={totalPages} />
    </div>
  )
}

ArticleList.defaultProps = {
  getArticlesData: () => {},
  articlesData: [],
  isLoading: true,
  error: false,
  totalPages: 0,
}

ArticleList.propTypes = {
  getArticlesData: PropTypes.func,
  articlesData: PropTypes.arrayOf(PropTypes.shape()),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  totalPages: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    articlesData: state.data.articles,
    isLoading: state.data.isLoading,
    error: state.data.error,
    totalPages: state.data.totalPages,
  }
}

function mapDispatchToProps(dispatch) {
  return { getArticlesData: dispatch(getArticles()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
