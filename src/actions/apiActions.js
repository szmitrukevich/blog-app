import { ARTICLES_LOAD, GET_ARTICLES, GET_ERROR, GET_TOTAL_PAGES } from './actionTypes'

export const toggleIsLoading = (isLoading) => ({ type: ARTICLES_LOAD, payload: isLoading })
export const updateArticleList = (array) => ({ type: GET_ARTICLES, payload: array })
export const getTotalPages = (total) => ({ type: GET_TOTAL_PAGES, payload: total })
export const throwError = (error) => ({ type: GET_ERROR, payload: error })
