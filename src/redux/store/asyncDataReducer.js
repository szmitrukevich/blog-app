import BlogService from '../../services/blogService'
import {
  toggleIsLoading,
  updateArticleList,
  getSingleArticle,
  throwError,
  getTotalPages,
  toggleAuthorization,
} from '../actions/apiActions'
import {
  ARTICLES_LOAD,
  GET_ARTICLES,
  GET_ARTICLE,
  GET_CURRENT_PAGE,
  GET_ERROR,
  GET_TOTAL_PAGES,
  TOGGLE_AUTHORIZATION,
} from '../actions/actionTypes'

const blog = new BlogService()
const initialState = {
  isLoading: true,
  totalPages: 0,
  currentPage: 1,
  articles: [],
  isAuthorized: false,
  currentArticle: { body: null },
  error: { isError: false, status: 200 },
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
    .catch((e) => {
      dispatch(toggleIsLoading(false))
      dispatch(throwError([true, e.message]))
    })
}

export const getArticle = (id) => (dispatch) => {
  if (id) {
    blog
      .getArticle(id)
      .then((res) => {
        dispatch(getSingleArticle(res.article))
      })
      .catch((e) => {
        dispatch(throwError([true, e.message]))
      })
  }
  dispatch(getSingleArticle({ body: null }))
}
export const createNewAcc = (info) => (dispatch) => {
  blog
    .createAccount(info)
    .then((res) => {
      localStorage.setItem('profile', JSON.stringify(res))
      localStorage.setItem('isAuthorized', 'true')
      dispatch(toggleAuthorization(true))
      dispatch(throwError([false, 200]))
    })
    .catch((e) => {
      dispatch(throwError([true, e.message]))
    })
}

export const login = (info) => (dispatch) => {
  blog
    .login(info)
    .then((res) => {
      localStorage.setItem('profile', JSON.stringify(res))
      localStorage.setItem('isAuthorized', 'true')
      dispatch(toggleAuthorization(true))
      dispatch(throwError([false, 200]))
    })
    .catch((e) => {
      dispatch(throwError([true, e.message]))
    })
}

export const updateProfile = (info, token) => (dispatch) => {
  blog
    .updateProfile(info, token)
    .then((res) => {
      localStorage.setItem('profile', JSON.stringify(res))
      dispatch(toggleAuthorization(true))
      dispatch(throwError([false, 200]))
    })
    .catch((e) => {
      dispatch(throwError([true, e.message]))
    })
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
    case TOGGLE_AUTHORIZATION:
      return { ...state, isAuthorized: payload }
    case GET_CURRENT_PAGE:
      return { ...state, currentPage: payload }
    case GET_ERROR:
      return { ...state, error: { isError: payload[0], status: payload[1] } }
    default:
      return state
  }
}

export default asyncDataReducer
