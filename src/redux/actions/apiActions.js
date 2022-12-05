import {
  ARTICLES_LOAD,
  GET_ARTICLES,
  GET_ARTICLE,
  GET_ERROR,
  GET_TOTAL_PAGES,
  GET_CURRENT_PAGE,
  GET_TOKEN,
  GET_USER_INFO,
  TOGGLE_AUTHORIZATION,
  CHANGED,
} from './actionTypes'

export const toggleIsLoading = (isLoading) => ({ type: ARTICLES_LOAD, payload: isLoading })
export const updateArticleList = (array) => ({ type: GET_ARTICLES, payload: array })
export const getSingleArticle = (article) => ({ type: GET_ARTICLE, payload: article })
export const getToken = (token) => ({ type: GET_TOKEN, payload: token })
export const getCurrentUser = (info) => ({ type: GET_USER_INFO, payload: info })
export const toggleAuthorization = (isLoggined) => ({ type: TOGGLE_AUTHORIZATION, payload: isLoggined })
export const getTotalPages = (total) => ({ type: GET_TOTAL_PAGES, payload: total })
export const getCurrentPage = (page) => ({ type: GET_CURRENT_PAGE, payload: page })
export const throwError = (error) => ({ type: GET_ERROR, payload: error })
export const setChanged = (succChanged) => ({ type: CHANGED, payload: succChanged })
