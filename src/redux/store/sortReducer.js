import { CHANGE_SORT } from '../actions/actionTypes'

const initialState = { sortItem: 'cheapest' }

const sortReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case CHANGE_SORT:
      return { sortItem: payload }
    default:
      return state
  }
}

export default sortReducer
