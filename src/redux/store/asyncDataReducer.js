import BlogService from '../../services/blogService'
import {
  toggleIsLoading,
  updateArticleList,
  getSingleArticle,
  throwError,
  getTotalPages,
  getToken,
  getCurrentUser,
  toggleAuthorization,
} from '../actions/apiActions'
import {
  ARTICLES_LOAD,
  GET_ARTICLES,
  GET_ARTICLE,
  GET_CURRENT_PAGE,
  GET_ERROR,
  GET_TOTAL_PAGES,
  GET_USER_INFO,
  GET_TOKEN,
  TOGGLE_AUTHORIZATION,
} from '../actions/actionTypes'

const blog = new BlogService()
blog
  .createAccount({
    user: {
      username: 'ololosh',
      email: 'zmufgh1234@gmail.com',
      password: '123456',
    },
  })
  .then((res) => console.log(res))
const initialState = {
  isLoading: true,
  totalPages: 0,
  currentPage: 1,
  articles: [],
  token: null,
  currentUser: {},
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

const setLocalStorageData = (userInfo) => {
  const keys = Object.keys(userInfo)
  keys.forEach((key) => {
    localStorage.setItem(key, userInfo[key])
  })
  localStorage.setItem('isAuthorized', 'true')
}

export const createNewAcc = (info) => (dispatch) => {
  blog
    .createAccount(info)
    .then((res) => {
      const { user } = info
      setLocalStorageData(user)
      const { token, ...data } = res
      dispatch(getCurrentUser({ ...data }))
      dispatch(getToken(token))
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
      const { user } = info
      setLocalStorageData(user)
      const { token, ...data } = res
      dispatch(getCurrentUser({ ...data }))
      dispatch(getToken(token))
      dispatch(toggleAuthorization(true))
      dispatch(throwError([false, 200]))
    })
    .catch((e) => {
      dispatch(throwError([true, e.message]))
    })
}

export const updateProfile = (info, currToken) => (dispatch) => {
  blog
    .updateProfile(info, currToken)
    .then((res) => {
      const { user } = info
      setLocalStorageData(user)
      const { token, ...data } = res
      dispatch(getCurrentUser({ ...data }))
      dispatch(throwError([false, 200]))
    })
    .catch((e) => {
      dispatch(throwError([true, e.message]))
    })
}

export const createArticle = (article, currToken) => (dispatch) => {
  blog
    .createArticle(article, currToken)
    .then(() => dispatch(throwError([false, 200])))
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
    case GET_USER_INFO:
      return { ...state, currentUser: { ...payload } }
    case GET_TOKEN:
      return { ...state, token: payload }
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
