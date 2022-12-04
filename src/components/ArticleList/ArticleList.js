import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import PropTypes from 'prop-types'
import { getArticles } from '../../redux/store/asyncDataReducer'
import classes from './ArticleList.module.scss'
import Article from '../Article'
import ErrorMessage from '../ErrorMessage'
import Pagination from '../Pagination'

const ArticleList = ({ articlesData, isLoading, error, getArticlesData, totalPages, currentPage }) => {
  const createArticle = (item) => (
    <Article
      author={item.author}
      description={item.description}
      created={item.createdAt}
      title={item.title}
      tagList={item.tagList}
      likes={item.favoritesCount}
      slug={item.slug}
      favorited={item.favorited}
      full={false}
      key={item.slug}
    />
  )

  let list = articlesData.map((article) => createArticle(article))

  useEffect(() => {
    getArticlesData(currentPage)
  }, [articlesData.length, currentPage, error])

  const spinner = isLoading && (
    <div className={classes.spinner}>
      <Spin />
    </div>
  )

  let errorMessage
  if (error.isError && error.status !== '422') {
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
}

ArticleList.propTypes = {
  getArticlesData: PropTypes.func,
  articlesData: PropTypes.arrayOf(PropTypes.shape()),
  isLoading: PropTypes.bool,
  error: PropTypes.shape(),
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    articlesData: state.data.articles,
    isLoading: state.data.isLoading,
    error: state.data.error,
    totalPages: state.data.totalPages,
    currentPage: state.data.currentPage,
  }
}

function mapDispatchToProps(dispatch) {
  return { getArticlesData: (page) => dispatch(getArticles(page)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
