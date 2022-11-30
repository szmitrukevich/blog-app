import BlogService from '../../services/blogService'
// eslint-disable-next-line import-newlines/enforce
import { toggleIsLoading, updateArticleList, getSingleArticle, throwError, getTotalPages } from '../actions/apiActions'
import {
  ARTICLES_LOAD,
  GET_ARTICLES,
  GET_ARTICLE,
  GET_CURRENT_PAGE,
  GET_ERROR,
  GET_TOTAL_PAGES,
} from '../actions/actionTypes'

const blog = new BlogService()
const initialState = {
  isLoading: true,
  totalPages: 0,
  currentPage: 1,
  articles: [],
  currentArticle: { body: null },
  error: false,
}

export const getArticles = (page) => (dispatch) => {
  dispatch(toggleIsLoading(true))
  blog
    .getArticles(page)
    .then((res) => {
      dispatch(updateArticleList(res.articles))
      dispatch(getTotalPages(res.articlesCount))
      dispatch(toggleIsLoading(false))
    })
    .catch(() => {
      dispatch(toggleIsLoading(false))
      dispatch(throwError(true))
    })
}

export const getArticle = (id) => (dispatch) => {
  if (id) {
    blog
      .getArticle(id)
      .then((res) => {
        dispatch(getSingleArticle(res.article))
      })
      .catch(() => {
        dispatch(throwError(true))
      })
  }
  dispatch(getSingleArticle({ body: null }))
}

const asyncDataReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case ARTICLES_LOAD:
      return { ...state, isLoading: payload }
    case GET_ARTICLES:
      return { ...state, articles: [...payload] }
    case GET_ARTICLE:
      return { ...state, currentArticle: payload }
    case GET_TOTAL_PAGES:
      return { ...state, totalPages: payload }
    case GET_CURRENT_PAGE:
      return { ...state, currentPage: payload }
    case GET_ERROR:
      return { ...state, error: true }
    default:
      return state
  }
}

export default asyncDataReducer
