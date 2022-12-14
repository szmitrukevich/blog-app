import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import PropTypes from 'prop-types'
import { getArticles } from '../../../redux/store/asyncDataReducer'
import classes from './ArticleList.module.scss'
import Article from '../../ui/Article'
import ErrorMessage from '../../ui/ErrorMessage'
import Pagination from '../../ui/Pagination'

const ArticleList = ({ articlesData, isLoading, error, getArticlesData, totalPages, currentPage, token }) => {
  const createArticle = (item) => (
    <Article
      author={item.author}
      description={item.description}
      createdAt={item.createdAt}
      title={item.title}
      tagList={item.tagList}
      favoritesCount={item.favoritesCount}
      slug={item.slug}
      favorited={item.favorited}
      full={false}
      key={item.slug}
    />
  )

  let list = articlesData.map((article) => createArticle(article))

  useEffect(() => {
    getArticlesData(currentPage, token)
  }, [articlesData.length, currentPage, error])

  const spinner = isLoading && (
    <div className={classes.spinner}>
      <Spin />
    </div>
  )

  let errorMessage
  if (error.message) {
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
  error: {},
  totalPages: 0,
  currentPage: 1,
  token: '',
}

ArticleList.propTypes = {
  getArticlesData: PropTypes.func,
  articlesData: PropTypes.arrayOf(PropTypes.shape()),
  isLoading: PropTypes.bool,
  error: PropTypes.shape(),
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  token: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    articlesData: state.data.articles,
    isLoading: state.data.isLoading,
    error: state.data.error,
    totalPages: state.data.totalPages,
    currentPage: state.data.currentPage,
    token: state.data.token,
  }
}

function mapDispatchToProps(dispatch) {
  return { getArticlesData: (page, token) => dispatch(getArticles(page, token)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
