import { FILTER_CHANGE } from './actionTypes'

const filterChange = (filterName) => ({
  type: FILTER_CHANGE,
  payload: filterName,
})

export default filterChange
