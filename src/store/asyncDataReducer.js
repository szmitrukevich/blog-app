import BlogService from '../services/blogService'
import { toggleIsLoading, updateArticleList, throwError, getTotalPages } from '../actions/apiActions'
import { ARTICLES_LOAD, GET_ARTICLES, GET_ERROR, GET_TOTAL_PAGES } from '../actions/actionTypes'

const blog = new BlogService()

const initialState = {
  isLoading: true,
  totalPages: 0,
  articles: [],
  error: false,
}
export const getArticles = () => (dispatch) => {
  blog
    .getArticles()
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

const asyncDataReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case ARTICLES_LOAD:
      return { ...state, isLoading: payload }
    case GET_ARTICLES:
      return { ...state, articles: [...payload] }
    case GET_TOTAL_PAGES:
      return { ...state, totalPages: payload }
    case GET_ERROR:
      return { ...state, error: true }
    default:
      return state
  }
}

export default asyncDataReducer
