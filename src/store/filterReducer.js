import { FILTER_CHANGE } from '../actions/actionTypes'

const initialState = {
  checked: {
    all: true,
    0: true,
    1: true,
    2: true,
    3: true,
  },
}

const checkedAll = (list) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Object.keys(list).reduce((acc, key) => {
    acc[key] = !list.all
    return acc
  }, {})

const updateFilters = (filter, filterList) => {
  let newList = {}
  if (filter === 'all') {
    newList = checkedAll(filterList)
  } else {
    newList = { ...filterList, [filter]: !filterList[filter], all: false }
  }
  if (Object.values(newList).filter((value) => value).length === 4) {
    newList = { ...newList, all: true }
  }
  return newList
}

const filterReducer = (state = initialState, { type, payload } = {}) => {
  const { checked } = state
  switch (type) {
    case FILTER_CHANGE:
      return { checked: updateFilters(payload, checked) }
    default:
      return state
  }
}

export default filterReducer
