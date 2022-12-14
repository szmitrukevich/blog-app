import BlogService from '../../services/blogService'
import {
  toggleIsLoading,
  updateArticleList,
  getSingleArticle,
  throwError,
  getTotalPages,
  getToken,
  setChanged,
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
  CHANGED,
  TOGGLE_AUTHORIZATION,
} from '../actions/actionTypes'

const blog = new BlogService()
const initialState = {
  isLoading: true,
  totalPages: 0,
  currentPage: 1,
  articles: [],
  token: null,
  currentUser: {},
  isAuthorized: false,
  currentArticle: { body: null },
  error: {},
  succChanged: false,
}

export const getArticles = (page, token) => (dispatch) => {
  dispatch(toggleIsLoading(true))
  blog
    .getArticles(page, token)
    .then((res) => {
      dispatch(updateArticleList(res.articles))
      dispatch(getTotalPages(res.articlesCount))
      dispatch(setChanged(false))
      dispatch(toggleIsLoading(false))
    })
    .catch((e) => {
      dispatch(toggleIsLoading(false))
      dispatch(throwError(JSON.parse(e.message)))
    })
}

export const getArticle = (id, token) => (dispatch) => {
  if (id) {
    blog
      .getArticle(id, token)
      .then((res) => {
        dispatch(getSingleArticle(res.article))
      })
      .catch((e) => {
        dispatch(throwError(JSON.parse(e.message)))
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
      dispatch(throwError({}))
    })
    .catch((e) => {
      dispatch(throwError(JSON.parse(e.message)))
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
      dispatch(throwError({}))
    })
    .catch((e) => {
      localStorage.clear()
      dispatch(throwError(JSON.parse(e.message)))
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
      dispatch(throwError({}))
      dispatch(setChanged(true))
    })
    .catch((e) => {
      dispatch(throwError(JSON.parse(e.message)))
      dispatch(setChanged(false))
    })
}

export const createArticle = (article, currToken) => (dispatch) => {
  blog
    .createArticle(article, currToken)
    .then(() => {
      dispatch(setChanged(true))
      dispatch(throwError({}))
    })
    .catch((e) => {
      dispatch(throwError(JSON.parse(e.message)))
      dispatch(setChanged(false))
    })
}

export const deleteArticle = (id, currToken) => (dispatch) => {
  blog
    .deleteArticle(id, currToken)
    .then(() => {
      dispatch(setChanged(true))
      dispatch(throwError({}))
    })
    .catch((e) => {
      dispatch(throwError(JSON.parse(e.message)))
      dispatch(setChanged(false))
    })
}

export const updateArticle = (id, article, currToken) => (dispatch) => {
  blog
    .updateArticle(id, article, currToken)
    .then(() => {
      dispatch(setChanged(true))
      dispatch(throwError({}))
    })
    .catch((e) => {
      dispatch(throwError(JSON.parse(e.message)))
      dispatch(setChanged(false))
    })
}

export const likeArticle = (id, currToken) => (dispatch) => {
  blog
    .likeArticle(id, currToken)
    .then(() => dispatch(throwError({})))
    .catch((e) => {
      dispatch(throwError(JSON.parse(e.message)))
      dispatch(setChanged(false))
    })
}

export const unlikeArticle = (id, currToken) => (dispatch) => {
  blog
    .unlikeArticle(id, currToken)
    .then(() => dispatch(throwError({})))
    .catch((e) => {
      dispatch(throwError(JSON.parse(e.message)))
      dispatch(setChanged(false))
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
    case CHANGED:
      return { ...state, succChanged: payload }
    case GET_CURRENT_PAGE:
      return { ...state, currentPage: payload }
    case GET_ERROR:
      return { ...state, error: payload }
    default:
      return state
  }
}

export default asyncDataReducer
